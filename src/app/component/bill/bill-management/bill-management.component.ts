import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';

// services

import { SnackbarService } from '../../../materialModule/snackbar/snackbar.service';

@Component({
  selector: 'app-bill-management',
  templateUrl: './bill-management.component.html',
  styleUrls: ['./bill-management.component.css'],
  providers: [SnackbarService]
})
export class BillManagementComponent implements OnInit {

  inventoryDetails: any;
  selectedDescription: any;
  selectedDiscountType: any = '%';
  selectedItem: any;
  selectedUnit: any;
  selectedRate: any;

  validateForm: any;
  controlLength: any;
  showFormArray: any = false;

  discountType = [
    { name: '%', id: '1' },
    { name: 'Rs.', id: '2' }
  ]

  discountInRS: any;
  totalBillAmount: any = 0;
  totalDiscount: any = 0;
  totalAdvance: any = 0;
  totalPayout: any = 0;

  constructor(
    private fb: FormBuilder,
    private ref: ChangeDetectorRef,
    private snackBarService: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.validateFormOnInit();
  }


  validateFormOnInit() {
    this.validateForm = this.fb.group({
      'inventoryInfo': this.fb.array([
        this.fb.group({
          billingItem: new FormControl(null),
          description: new FormControl(null),
          unit: new FormControl(null),
          rate: new FormControl(null),
          discount: new FormControl(null),
          discountInRS: new FormControl(null),
          discountType: new FormControl(null),
          amount: new FormControl(null),
        })
      ]),
    });
  }

  get f() { return this.validateForm.controls; }

  get billsList() {
    return this.validateForm.get("inventoryInfo")["controls"];
  }

  addBillsItem() {
    console.log('selectedItem',this.selectedItem)
    console.log('selectedRate',this.selectedRate)
    console.log('selectedUnit',this.selectedUnit)
    console.log('selectedDescription',this.selectedDescription)
    if (this.selectedItem == undefined && this.selectedRate == undefined && this.selectedUnit == undefined && this.selectedDescription == undefined) {
      this.snackBarService.warningToaster('Please enter value', '');
    } else {
    this.showFormArray = true;
    const control = <FormArray>this.validateForm.controls["inventoryInfo"];

    // control.removeAt(control.length - 1);
    const amount = parseInt(this.selectedUnit) * parseInt(this.selectedRate);
    const addrCtrl = this.fb.group({
      billingItem: this.selectedItem,
      description: this.selectedDescription,
      unit: parseInt(this.selectedUnit) ? parseInt(this.selectedUnit) : 1,
      rate: parseInt(this.selectedRate) ? parseInt(this.selectedRate) : 0,
      discount: 0,
      discountInRS: 0,
      discountType: '%',
      amount: amount ? amount : 0,
    });
    control.push(addrCtrl);
    if (control.value[0].billingItem == null) {
      (<FormArray>this.validateForm.get("inventoryInfo")).removeAt(0);
    }
 
    this.loadNewValueCalculation();
    this.selectedItem = '';
    this.selectedDescription = '';
    this.selectedUnit = '';
    this.selectedRate = '';
  }
  }

  deleteBillsItem(index: any) {
    (<FormArray>this.validateForm.get("inventoryInfo")).removeAt(index);
    this.controlLength = (<FormArray>this.validateForm.get("inventoryInfo")).length;
    this.loadNewValueCalculation();
  }

  loadNewValueCalculation() {
    // reset the total amount  
    this.totalBillAmount = 0;
    this.totalDiscount = 0;
    const ctrl = <FormArray>this.validateForm.controls['inventoryInfo'];
    // iterate each object in the form array
    ctrl.controls.forEach(x => {
      // get the itemmt value and need to parse the input to number
      let parsedBillAmount = parseInt(x.get('amount')?.value)
      this.totalBillAmount += parsedBillAmount;
      let parseDiscountInRSAmount = parseInt(x.get('discountInRS')?.value);
      this.totalDiscount += parseDiscountInRSAmount;
      this.ref.detectChanges()
    });
    this.totalPayout = this.totalBillAmount;
  }


  patch(servicename: any, description: any, unit: any, rate: any, discount: any, amount: any,
    cgst: any, sgst: any,) {
    return this.fb.group({
      billingItem: servicename,
      description: description,
      unit: unit,
      rate: rate,
      discount: 0,
      discountInRS: 0,
      discountType: '%',
      amount: amount
    });

  }

  onInputUnit(event: any, index: any) {
    const value = event.target.value;
    this.totalCalculation(value, index);
  }

  onInputRate(event: any, index: any) {
    const value = event.target.value;
    this.totalCalculation(value, index);
  }

  onInputDiscount(event: any, index: any) {
    const type = ((this.validateForm.get('inventoryInfo') as FormArray).at(index) as FormGroup).get('discountType')?.value
    const value = event.target.value;
    if (type == '%') {
      if (value > 100) {
        ((this.validateForm.get('inventoryInfo') as FormArray).at(index) as FormGroup).get('discount')?.patchValue(0);
        this.totalCalculation(parseInt(value), index);
      } else {
        ((this.validateForm.get('inventoryInfo') as FormArray).at(index) as FormGroup).get('discount')?.patchValue(value);
        this.totalCalculation(parseInt(value), index);
      }
    } else if (type == 'Rs.') {
      const amount = ((this.validateForm.get('inventoryInfo') as FormArray).at(index) as FormGroup).get('amount')?.value
      if (value > amount) {
        ((this.validateForm.get('inventoryInfo') as FormArray).at(index) as FormGroup).get('discount')?.patchValue(0);
        this.totalCalculation(parseInt(value), index);
      } else {
        ((this.validateForm.get('inventoryInfo') as FormArray).at(index) as FormGroup).get('discount')?.patchValue(value);
        this.totalCalculation(parseInt(value), index);
      }
    }

  }

  selecteDiscountType(value: any, index: any) {
    if (value) {
      this.selectedDiscountType = value;
      this.totalCalculation(value, index);
    }
  }

  totalCalculation(event: any, index: any) {
    const type = ((this.validateForm.get('inventoryInfo') as FormArray).at(index) as FormGroup).get('discountType')?.value
    const selectedUnit = ((this.validateForm.get('inventoryInfo') as FormArray).at(index) as FormGroup).get('unit')?.value;
    const selectedRate = ((this.validateForm.get('inventoryInfo') as FormArray).at(index) as FormGroup).get('rate')?.value
    const selectedDiscount = ((this.validateForm.get('inventoryInfo') as FormArray).at(index) as FormGroup).get('discount')?.value;
    const selectedDiscountType = ((this.validateForm.get('inventoryInfo') as FormArray).at(index) as FormGroup).get('discountType')?.value;
    this.selectedDiscountType = selectedDiscountType;
    const ratewithunit = selectedUnit * selectedRate;
    if (type == '%') {
      const amount = ratewithunit - (ratewithunit * selectedDiscount / 100);
      this.discountInRS = ratewithunit * selectedDiscount / 100;
      ((this.validateForm.get('inventoryInfo') as FormArray).at(index) as FormGroup).get('amount')?.patchValue(amount);
      ((this.validateForm.get('inventoryInfo') as FormArray).at(index) as FormGroup).get('discountInRS')?.patchValue(this.discountInRS);
    } else {
      const amount = ratewithunit - selectedDiscount;
      this.discountInRS = selectedDiscount;
      ((this.validateForm.get('inventoryInfo') as FormArray).at(index) as FormGroup).get('amount')?.patchValue(amount);
      ((this.validateForm.get('inventoryInfo') as FormArray).at(index) as FormGroup).get('discountInRS')?.patchValue(this.discountInRS);
    }
    this.validateForm.get('inventoryInfo').valueChanges.subscribe((values: any) => {
      this.totalBillAmount = 0;
      this.totalDiscount = 0;
      // calculate bill amount
      const ctrl = <FormArray>this.validateForm.controls['inventoryInfo'];
      // iterate each object in the form array
      ctrl.controls.forEach(x => {
        // get the itemmt value and need to parse the input to number
        let parsedBillAmount = parseInt(x.get('amount')?.value)
        this.totalBillAmount += parsedBillAmount;
        let parseDiscountInRSAmount = parseInt(x.get('discountInRS')?.value);
        this.totalDiscount += parseDiscountInRSAmount;
      });
    })
    this.totalPayout = this.totalBillAmount;
  }

  onSubmit(data: any) {

  }

  onClickSave() {
    this.inventoryDetails = this.validateForm.value;
    alert(JSON.stringify(this.inventoryDetails))
  }

}
