import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {  ModalControllerService } from '../../../Services/modal-controller.service';
import { FiltersComponent } from '../../../Models/filters/filters.component';
import {sortingArray} from '../../../JSON/sorting';
import { ItemsDataService } from '../../../Services/items-data-services/items-data.service';
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
  constructor(private route:Router,private modelCtrl:ModalControllerService,private itemSourceService:ItemsDataService) { }

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
    //IN CASE OF KILOMETERAGE REPLACE THE SELECTED WORD WITH KM
    if(item.id === 5 || item.id === 6){
      this.selectedSortText = "KM"
    } else {
      this.selectedSortText = item.name.split(' ')[0];
    }
    this.items.forEach(x=>x.selected = false);
    this.items[index].selected = true;
    console.log("ITEM ", item);
    this.pickIcon(item.id)
    this.itemSourceService.itemSortBy = item.value;
    this.itemSourceService.getPosts(0,30);
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
