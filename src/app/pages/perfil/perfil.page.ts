import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { ActionSheetController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';

@Component({
  selector: 'app-perfil',
  templateUrl: 'perfil.page.html',
  styleUrls: ['perfil.page.scss'],
})
export class PerfilPage {
  userImage = "/assets/stan-lee.jpg";
  photo: SafeResourceUrl | undefined;
  nombre: string | undefined;
  apellido: string | undefined;
  numeroContacto: string | undefined;
  correo: string | undefined;
  institucion: string | undefined;

  constructor(
    private sanitizer: DomSanitizer,
    public actionSheetController: ActionSheetController
  ) { }

  async showActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Selecciona una imagen',
      buttons: [{
        text: 'Tomar Foto',
        icon: 'camera',
        handler: () => {
          this.takePhoto();
        }
      }, {
        text: 'Seleccionar de Galería',
        icon: 'image',
        handler: () => {
          this.selectPhoto();
        }
      }]
    });
    await actionSheet.present();
  }

  async takePhoto() {
    const image = await Plugins['Camera']['getPhoto']({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,

    });
    console.log('image', image);
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && image.dataUrl);
  }

  async selectPhoto() {
    const image = await Plugins['Camera']['getPhoto']({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos,

    });
    console.log('image', image);
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && image.dataUrl);
  }

  guardarPerfil() {
    if (!this.nombre || !this.apellido || !this.numeroContacto || !this.correo || !this.institucion) {

      alert('Por favor, complete todos los campos antes de guardar el perfil.');
      return;
    }

    const perfil = {
      nombre: this.nombre,
      apellido: this.apellido,
      numeroContacto: this.numeroContacto,
      correo: this.correo,
      institucion: this.institucion,
    };
    localStorage.setItem('perfil', JSON.stringify(perfil));

    // Muestra un mensaje de éxito
    alert('Perfil creado con éxito!');
  }

}
