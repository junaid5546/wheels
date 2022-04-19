import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from "rxjs";
import { CarInfoModalComponent } from '../Models/car-info-modal/car-info-modal.component';
import { FiltersComponent } from '../Models/filters/filters.component';
import { ImagePreviewComponent } from '../Models/image-preview/image-preview.component';
@Injectable({
  providedIn: 'root'
})
export class ModalControllerService {

  sortBy: any[] = [
    { id: 1, name: 'Sort by Price (Lowest)', icon: "arrow-down-outline" },
    { id: 2, name: 'Sort by Price (Highest)', icon: "arrow-up-outline" },
    { id: 3, name: 'Sort by newest', icon: "time-outline" },
    { id: 4, name: 'Sort by oldest', icon: 'calendar-outline' },
    { id: 5, name: 'Sort by mileage', icon: "speedometer-outline" },
    { id: 6, name: 'Sort by mileage', icon: "speedometer-outline" }
  ]
  modalProps: any;
  private currentObject = new BehaviorSubject<any>(null);
  modelData = {
    items: [
      { key: 0, name: 'Make', value: [{ name: 'Toyota' }, { name: 'Nissan' }, { name: 'BMW' }], selected: {} },
      { key: 1, name: 'Model', value: [{ name: 'Camry ' }, { name: 'Corolla' }, { name: 'Avalon' }], selected: {} },
      { key: 2, name: 'Trims', value: [{ name: 'gli' }, { name: 'xli' }], selected: {} },
      { key: 3, name: 'Year', value: [{ name: '20001' }, { name: 20002 }], selected: {} },
      { key: 4, name: 'Condition', value: [{ name: 'Used' }, { name: 'New' }], selected: {} },
      { key: 5, name: 'Body', value: [{ name: 'sedan' }, { name: 'medtain' }, { name: 'sedan' }, { name: 'medtain' }, { name: 'sedan' }, { name: 'medtain' }], selected: {} },
      { key: 6, name: 'Exterior Color', value: [{ name: 'E3E300' }, { name: "ECECC9" }, { name: 'F8F8F8' }, { name: 'EFCA00' }, { name: 'EC9900' }, { name: 'E2B322' }], selected: {} },
      { key: 7, name: 'Door Count', value: [{ name: 1 }, { name: 2 }, { name: 3 }], selected: {} },
      { key: 8, name: 'Engine size', value: [{ name: 'big' }, { name: 'small' }], selected: {} },
      { key: 9, name: 'Cylinder count', value: [{ name: 'sedan' }, { name: 'medtain' }], selected: {} },
      { key: 10, name: 'Fuel Type', value: [{ name: 'sedan' }, { name: 'medtain' }], selected: {} },
      { key: 11, name: 'Transmission Type', value: [{ name: 'sedan' }, { name: 'medtain' }], selected: {} },
      { key: 12, name: 'Drivetrain', value: [{ name: 'sedan' }, { name: 'medtain' }], selected: {} },
      { key: 13, name: "interior Color", value: [{ name: 'sedan' }, { name: 'medtain' }, { name: 'sedan' }, { name: 'medtain' }], selected: {} },
      { key: 14, name: 'Seat type', value: [{ name: 'sedan' }, { name: 'medtain' }], selected: {} },
      { key: 15, name: 'Origin', value: [{ name: 'sedan' }, { name: 'medtain' }], selected: {} },
      { key: 16, name: 'Governorate', value: [{ name: 'sedan' }, { name: 'medtain' }], selected: {} },
      { key: 17, name: 'State', value: [{ name: 'sedan' }, { name: 'medtain' }], selected: {} },
      { key: 18, name: 'Warranty Duration', value: [{ name: 'sedan' }, { name: 'medtain' }], selected: {} },
      { key: 19, name: 'Warranty Distance', value: [{ name: 'sedan' }, { name: 'medtain' }], selected: {} },
      { key: 20, name: 'Insurance type', value: [{ name: 'sedan' }, { name: 'medtain' }], selected: {} },
      { key: 21, name: 'Driving Readlines', value: [{ name: 'sedan' }, { name: 'medtain' }], selected: {} },
      { key: 22, name: 'Sale Type', value: [{ name: 'sedan' }, { name: 'medtain' }], selected: {} },
      { key: 23, name: 'Features', value: [{ name: 'sedan' }, { name: 'medtain' }], selected: {} },
      { key: 24, name: 'Additional Details', value: [{ name: 'sedan' }, { name: 'medtain' }], selected: {} },
      { key: 25, name: 'Special Plans', value: [{ name: 'sedan' }, { name: 'medtain' }], selected: {} }
    ],
    current: { index: 0, value: null },
    next: { index: 0, value: null },
    pervious: { index: 0, value: null },
    length: -1
  };

  constructor(private modalController: ModalController,

  ) { }

  async presentModal(props) {
    this.modalProps = props;
    console.log("PROPS: ", this.modalProps);
    const modal = await this.modalController.create({
      component: CarInfoModalComponent,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      componentProps: props,
      animated: true,
      backdropBreakpoint: 0.8,
      backdropDismiss: true,
      keyboardClose: true,
      showBackdrop: true,
      presentingElement: await this.modalController.getTop() // Get the top-most ion-modal
    });
    modal.onDidDismiss()
      .then((res: any) => {
        console.log("Dismiss result: ", res);
      });

    return await modal.present();
  }

  goToNextState() {
    let item = this.getCurrentState();
    this.modelData.pervious.value = item;
    this.modelData.next.value = this.modelData.items[item.value + 2];
    this.modelData.current.value = this.modelData.items[item.value + 1];
    console.log("Current:", this.modelData.current, " Previous: ", this.modelData.pervious, " Next: ", this.modelData.next);
  }

  goToPreviousState() {
    this.modelData.pervious.value = this.modelData.items[this.modelData.current.index - 1];
    this.modelData.current = this.modelData.pervious;
    this.modelData.next = this.modelData.current;

    console.log("Current:", this.modelData.current, " Previous: ", this.modelData.pervious, " Next: ", this.modelData.next);
  }

  selectItem(selected) {
    this.modelData.items[this.modelData.current.index].selected = selected;
    this.incrementOfCurrentIndex();
  }


  dismissModal = () => {
    if (this.modelData.current.index > 0) {
      this.decrementOfIndexes();
    } else {
      this.modalController.dismiss(this.modalProps)
        .then((res: any) => {
          this.decrementOfIndexes();
        })
    }

  }

  postFinished() {
    this.modalController.dismiss(this.modalProps);
  }


  validateItems() {
    if (this.modelData.items != undefined || this.modelData.items.length != 0) {
      this.modelData.length = this.modelData.items.length;
      //console.log("LENGTH: ", this.modelData.length);
      return { status: true, value: this.modelData.items.length };
    } else {
      //console.log("Else: ", this.modelData.length);
      return { status: false, value: this.modelData.items };
    }
  }

  initializeIndexes() {
    this.modelData.current.index = 24;
    this.modelData.current.value = this.modelData.items[24];

    this.modelData.next.index = 1;
    this.modelData.next.value = this.modelData.items[1];

    this.modelData.pervious.index = -1
    this.modelData.pervious.value = this.modelData.items[-1];

    return { status: true, current: this.modelData.current, previous: this.modelData.pervious, next: this.modelData.next };
  }

  startIndexing() {
    let validate = this.validateItems();
    //console.log("Result from  validateItems", validate);
    if (validate.status) {
      let indexes = this.initializeIndexes();
      //console.log("Result from  initializeIndexes", indexes);
      return { status: true, value: indexes };
    } else {
      return { status: false, value: null };

    }
  }

  getCurrentItemIndex() {
    return this.modelData.current.index;
  }

  getItemsLenght() {
    return this.modelData.length;
  }

  getCurrentState() {
    return this.modelData.current;
  }

  incrementOfCurrentIndex() {
    if (this.getCurrentItemIndex() < this.getItemsLenght() - 1) {
      console.log("Current:", this.getCurrentItemIndex(), "Length: ", this.getItemsLenght());
      // CURRENT ONE GOES TO PREVIOUS
      this.modelData.pervious.value = this.modelData.current.value;
      this.modelData.pervious.index = this.modelData.current.index;
      // NEXT ONE TAKE PLACE CURRENT ONE
      this.modelData.current.value = this.modelData.next.value;
      this.modelData.current.index = this.modelData.next.index;
      // NEXT ONE INCREASES
      this.modelData.next.index++;
      this.modelData.next.value = this.modelData.items[this.modelData.next.index];
      //return {status:true, current:this.modelData.current, previous:this.modelData.pervious, next:this.modelData.next };
      //this.presentModal(this.getCurrentState());
      this.updatecurrentObject();
    } else {
      console.log("ERROR");
      console.log("ITEM LENGTH: ", this.getItemsLenght());
      console.log("ITEM Index Length: ", this.getCurrentItemIndex());
      //return {status:false, current:this.modelData.current, previous:this.modelData.pervious, next:this.modelData.next };
    }
  }



  decrementOfIndexes() {
    if (this.getCurrentItemIndex() > 0) {
      // CURRENT ONE GOES TO PREVIOUS
      this.modelData.next.value = this.modelData.current.value;
      this.modelData.next.index = this.modelData.current.index;
      // NEXT ONE TAKE PLACE CURRENT ONE
      this.modelData.current.value = this.modelData.pervious.value;
      this.modelData.current.index = this.modelData.pervious.index;
      // NEXT ONE INCREASES
      this.modelData.pervious.index--;
      this.modelData.pervious.value = this.modelData.items[this.modelData.pervious.index];
      //return {status:true, current:this.modelData.current, previous:this.modelData.pervious, next:this.modelData.next };
      this.updatecurrentObject();
    } else {
      console.log("ERROR");
      console.log("ITEM LENGTH: ", this.getItemsLenght());
      console.log("ITEM Index Length: ", this.getCurrentItemIndex());
      //return {status:false, current:this.modelData.current, previous:this.modelData.pervious, next:this.modelData.next };
    }
  }

  updatecurrentObject() {
    this.currentObject.next(this.modelData.current);
  }

  getCurrentObject() {
    return this.currentObject.asObservable();
  }

async presentImagePreviewModal(imagesArray){
const modal = await this.modalController.create({
  component:ImagePreviewComponent,
  cssClass: 'image-preview',
  componentProps:{"dataArray":imagesArray},
});
return await modal.present();
}


  async presentSheetModal(component,arr) {
    const modal = await this.modalController.create({
      component: component,
      cssClass: "custom-modal",
      initialBreakpoint: 0.5,
      componentProps:{"dataArray":arr},
      breakpoints: [0, 0.5, 1]
    });
    return await modal.present();
  }

  applyFilter(arr: any[], filterId) {
    switch (filterId) {

      case 1:
      return arr.sort((a,b)=>{
        return a.price - b.price
      });
        break;

      case 2:
        return arr.sort((a,b)=>{
          return b.price - a.price
        });
        break;


      case 3:
       
        return arr.sort((a,b)=>{
          return a.date - b.date
        });
        
        break;



      case 4:
        return arr.sort((a,b)=>{
          return a.milage - b.milage
        });
        break;

        case 5:
        return arr.sort((a,b)=>{
          return b.milage - a.milage
        });
        break;

      default:
        break;
    }
  }


  dismissImagePreviewModal(){
    this.modalController.dismiss();
  }
}
