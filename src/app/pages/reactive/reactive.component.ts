import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  form : FormGroup;
  listaMaestros: any = [];
  localList = [];
  onlyLettersPattern = '^[A-Za-zÀ-ÿ ]+$';
  numericPattern = '^[0-9]+$';

  constructor(private fb: FormBuilder, private validatorService: ValidadoresService) {

    this.buildForm();
   }

  ngOnInit(): void {
    this.listaMaestros = JSON.parse(localStorage.getItem('teacher')) ? JSON.parse(localStorage.getItem('teacher')) : [];
    
  }
  get nombreInvalido(){
    return this.form.get('name').invalid && this.form.get('name').touched
  }
  get identificacionInvalido(){
    return this.form.get('identification_number').invalid && this.form.get('identification_number').touched
  }
  get phoneInvalido(){
    return this.form.get('phone').invalid && this.form.get('phone').touched
  }
  get barrioInvalido(){
    return this.form.get('address.barrio').invalid && this.form.get('address.barrio').touched
  }


  buildForm(){
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(this.onlyLettersPattern), Validators.minLength(3), Validators.maxLength(50)]],
      identification_number: ['', [Validators.required, Validators.pattern(this.numericPattern)]],
      phone: ['', [Validators.required]],
      address: this.fb.group({
        barrio: ['', Validators.required]
      })
    });
  }

  eliminarMaestro(i: number){
    Swal.fire({
      icon: 'question',
      title: '<strong>Eliminar</strong>',
      html: `<p style="text-align: center">¿Seguro desea eliminar el profesor? </p>`,
      showCancelButton: true,
      allowOutsideClick: false,
      width: '30%',
      confirmButtonColor: '#ff0000',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    })
    .then((result) => {
      if (result.isConfirmed) {
          this.listaMaestros.splice(i, 1);
          localStorage.setItem('teacher', JSON.stringify(this.listaMaestros));
      }
    });
    
  }

  guardar(){
    if(this.form.valid){
      const lista = this.validatorService.saveMaestro(this.form.controls);
      if(lista.status){
        this.listaMaestros.push(lista.listMaestros);
        localStorage.setItem('teacher', JSON.stringify(this.listaMaestros));
        this.form.controls.name.setValue('');
        this.form.controls.identification_number.setValue('');
        this.form.controls.phone.setValue('');
        Swal.fire({
          icon: 'success',
          title: '<strong>Guardado</strong>',
          html: `<p style="text-align: center">Se ha guardado correctamente el profesor</p>`,
          allowOutsideClick: false,
          width: '30%',
          confirmButtonColor: '#8fb83e',
          confirmButtonText: 'Aceptar',
        });
      }
      
    };
    
  }

}
