import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {  ModalControllerService } from '../../../Services/modal-controller.service';
import { FiltersComponent } from '../../../Models/filters/filters.component';
import {sortingArray} from '../../../JSON/sorting';
@Component({
  selector: 'app-filter-heading',
  templateUrl: './filter-heading.component.html',
  styleUrls: ['./filter-heading.component.scss'],
})
export class FilterHeadingComponent implements OnInit {
  @ViewChild('popover') popover;
  selected = 0;
  selectedSortText = '';
  selectedSortIcon = null;
  isOpen = false;

  items:any[] = sortingArray;
  constructor(private route:Router,private modelCtrl:ModalControllerService,) { }

  ngOnInit() {}

  showFilters() {
    this.route.navigate(['filter']);
  }

  openSheetmodel() {
    this.modelCtrl.presentSheetModal(FiltersComponent,this.items);
  }

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  checkSorting(item,index){
    this.items.forEach(x=>x.selected = false);
    this.items[index].selected = true;
    console.log("ITEM ", item);
    this.selectedSortText = item.name.split(' ')[0];
    this.pickIcon(item.id)
  }

  pickIcon(id:number){
    switch (id) {
      case 1:
        this.selectedSortIcon = 'assets/icon/sorting icons/price-up.svg'
      break;

      case 2:
        this.selectedSortIcon = 'assets/icon/sorting icons/price-down.svg'
        break

        case 3:
          this.selectedSortIcon = 'assets/icon/sorting icons/price-down.svg'
          break

          case 4:
            this.selectedSortIcon = 'assets/icon/sorting icons/price-up.svg'
            break

            case 5:
              this.selectedSortIcon = 'assets/icon/sorting icons/price-down.svg'
              break

              case 6:
                this.selectedSortIcon = 'assets/icon/sorting icons/price-up.svg'
                break

                case 7:
                  this.selectedSortIcon = 'assets/icon/sorting icons/price-up.svg'
                  break

                  case 8:
                    this.selectedSortIcon = 'assets/icon/sorting icons/price-down.svg'
                    break
    
      default:
        break;
    }
  }
}
