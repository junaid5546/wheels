import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-warranty-duration',
  templateUrl: './warranty-duration.component.html',
  styleUrls: ['./warranty-duration.component.scss'],
})
export class WarrantyDurationComponent implements OnInit {
  results:any;
  WarrantyDuration = [
    [
      {
          "_id": "dfd25b38-61b7-4ddc-90e9-bdf879f40e57",
          "name": "No Warranty"
      },
      {
          "_id": "70add279-8c36-44d7-8a29-aeb5283ea6ab",
          "name": "1 Month"
      },
      {
          "_id": "927ed937-4468-402e-a4c2-69aedc81a420",
          "name": "2 Months"
      },
      {
          "_id": "d376e57e-353e-415e-a551-8a7a130b14ed",
          "name": "3 Months"
      },
      {
          "_id": "6a3d9a8d-1471-4204-86a9-48fc0b27430e",
          "name": "4 Months"
      },
      {
          "_id": "15ac92b1-7331-41c4-8698-ebdda5f1972d",
          "name": "5 Months"
      },
      {
          "_id": "9ca2e934-1b71-4281-9b99-67f45b375088",
          "name": "6 Months"
      },
      {
          "_id": "512766d5-8719-4994-a35d-08498919ff2a",
          "name": "7 Months"
      },
      {
          "_id": "5b7eb2f9-7a85-4b79-8de4-a1ce736ee487",
          "name": "8 Months"
      },
      {
          "_id": "07f4bd4c-262a-4a83-a459-d116e223d4f3",
          "name": "9 Months"
      },
      {
          "_id": "b6a06552-64d1-4882-bf56-d920c49bd32b",
          "name": "10 Months"
      },
      {
          "_id": "71a6dc64-ab72-4ed6-8160-9853707cc8e5",
          "name": "11 Months"
      },
      {
          "_id": "e4327211-8b83-4b7c-93f4-b85dd4adee8c",
          "name": "1 Year"
      },
      {
          "_id": "b22355ad-5743-4214-b1fe-9b9a38eb5fbe",
          "name": "1 Year & 1 Months"
      },
      {
          "_id": "19ab63f5-143c-48a3-a93c-e31fe76ab207",
          "name": "1 Year & 2 Months"
      },
      {
          "_id": "ddf73010-d7c6-481b-9e4c-c59998c7a89b",
          "name": "1 Year & 3 Months"
      },
      {
          "_id": "b9b162bf-da2e-4f18-af68-18d8f4bc98da",
          "name": "1 Year & 4 Months"
      },
      {
          "_id": "37ec7262-ad8f-4be3-9613-ea4a15ab8e76",
          "name": "1 Year & 5 Months"
      },
      {
          "_id": "36bcf9bf-981a-4e18-85d5-f5db9387dd92",
          "name": "1 Year & 6 Months"
      },
      {
          "_id": "b0fa614a-f964-4f7f-b460-0a09ec051cb3",
          "name": "1 Year & 7 Months"
      },
      {
          "_id": "1132232f-3794-4cb2-aeb0-bbd4d4f5186f",
          "name": "1 Year & 8 Months"
      },
      {
          "_id": "264c1fbb-3f96-4656-b6c1-c55c940d20e0",
          "name": "1 Year & 9 Months"
      },
      {
          "_id": "00296f15-bb03-4197-8c2f-a9521bd45e09",
          "name": "1 Year & 10 Months"
      },
      {
          "_id": "7a55c5e3-95f5-412e-84f2-e46c8aa53227",
          "name": "1 Year & 11 Months"
      },
      {
          "_id": "217f2b75-5e40-439c-a547-f38ce07ef731",
          "name": "2 Years"
      },
      {
          "_id": "055e4307-cdb4-4342-beff-a48f3113155a",
          "name": "2 Years & 1 Months"
      },
      {
          "_id": "80d915ac-8bd2-4b43-8440-cb173329c67b",
          "name": "2 Years & 2 Months"
      },
      {
          "_id": "1d5e1e71-7b52-488a-8b7e-f25f5bedab00",
          "name": "2 Years & 3 Months"
      },
      {
          "_id": "9dca1938-365c-4487-8352-a43776a46f7d",
          "name": "2 Years & 4 Months"
      },
      {
          "_id": "2d92015e-cf70-49f1-9ec6-94dbe7fb6fb4",
          "name": "2 Years & 5 Months"
      },
      {
          "_id": "ad44c7cf-0be3-4dd8-9e48-3a55c11daec2",
          "name": "2 Years & 6 Months"
      },
      {
          "_id": "6fc819b4-6f73-40fc-8403-651549cea055",
          "name": "2 Years & 7 Months"
      },
      {
          "_id": "95b61758-1deb-49d1-aea2-e6194c3b865a",
          "name": "2 Years & 8 Months"
      },
      {
          "_id": "5c3b8183-392a-444c-8d93-e523c3f48409",
          "name": "2 Years & 9 Months"
      },
      {
          "_id": "e3eeda63-e45b-42ae-8de0-bc21cb264503",
          "name": "2 Years & 10 Months"
      },
      {
          "_id": "edb8eb6b-4179-45db-af2c-7318eeef6f2e",
          "name": "2 Years & 11 Months"
      },
      {
          "_id": "9184e25c-e2bb-45c2-af79-3366573e2678",
          "name": "3 Years"
      },
      {
          "_id": "c2e64653-6c11-4567-afb0-699609546a9f",
          "name": "3 Years & 1 Months"
      },
      {
          "_id": "a13227ce-9f03-4eef-9db8-f5b8cf0472ae",
          "name": "3 Years & 2 Months"
      },
      {
          "_id": "3ae8b1b5-f708-4d4e-90d4-be20fba77431",
          "name": "3 Years & 3 Months"
      },
      {
          "_id": "2678cdc4-ed2f-44a1-bea6-188550e54ce3",
          "name": "3 Years & 4 Months"
      },
      {
          "_id": "685cc70f-82a7-4856-998f-55634baa5409",
          "name": "3 Years & 5 Months"
      },
      {
          "_id": "de0f5224-0b0d-453d-a9ea-4a0a0f24d48f",
          "name": "3 Years & 6 Months"
      },
      {
          "_id": "577086aa-55a3-45a9-a17e-d5e4e8f206fd",
          "name": "3 Years & 7 Months"
      },
      {
          "_id": "a6c8a02f-d050-47b5-bef7-2b867218777e",
          "name": "3 Years & 8 Months"
      },
      {
          "_id": "7890ba77-9180-4ec2-a48f-faf82dc6e3b1",
          "name": "3 Years & 9 Months"
      },
      {
          "_id": "c3fe649d-7391-401d-8fc0-7534f73667b3",
          "name": "3 Years & 10 Months"
      },
      {
          "_id": "fcb6539f-1a5c-4f77-bfaa-5b80913c45a8",
          "name": "3 Years & 11 Months"
      },
      {
          "_id": "7283a3b6-c04c-43e7-872d-da8848cc3072",
          "name": "4 Years"
      },
      {
          "_id": "20858d75-1ecb-4577-a06f-fdaa6dfb06e6",
          "name": "4 Years & 1 Months"
      },
      {
          "_id": "92562787-2f4b-43bc-af8c-ec2bc40f5c81",
          "name": "4 Years & 2 Months"
      },
      {
          "_id": "20a3ebc4-5c31-4a86-91e0-88d2d37802b4",
          "name": "4 Years & 3 Months"
      },
      {
          "_id": "69f56c9b-4a9c-4cf5-8a89-de8fd8e5cf05",
          "name": "4 Years & 4 Months"
      },
      {
          "_id": "01d0e4ef-154d-4097-a188-a72ff55b3ff5",
          "name": "4 Years & 5 Months"
      },
      {
          "_id": "20347d23-781c-47fd-a6bf-8126663a8418",
          "name": "4 Years & 6 Months"
      },
      {
          "_id": "8fd08829-e0c2-45b1-8803-7e8f55bfa465",
          "name": "4 Years & 7 Months"
      },
      {
          "_id": "c67a9724-04ff-4b3e-b4f4-78cfef6e09bd",
          "name": "4 Years & 8 Months"
      },
      {
          "_id": "54ea1242-931d-4b0e-8ed5-0eb31d070312",
          "name": "4 Years & 9 Months"
      },
      {
          "_id": "7a72f6aa-2ed1-4a02-9a88-4e7b01411d1b",
          "name": "4 Years & 10 Months"
      },
      {
          "_id": "8f817f9a-b82a-4d71-be29-0bd98d3297b1",
          "name": "4 Years & 11 Months"
      },
      {
          "_id": "2fb9e3f6-27bb-4dd7-9b48-ccd1ace2c529",
          "name": "5 Years"
      },
      {
          "_id": "6cfcaf3f-d182-4ce0-8c52-6b23efda1977",
          "name": "5 Years & 1 Months"
      },
      {
          "_id": "29e3b3ff-a7f0-474f-a2ba-682eb3bf410f",
          "name": "5 Years & 2 Months"
      },
      {
          "_id": "3f5e5458-a195-4943-b57b-bc1cb2c4df73",
          "name": "5 Years & 3 Months"
      },
      {
          "_id": "81d78779-d63e-4bb6-80e5-5d3dc0865357",
          "name": "5 Years & 4 Months"
      },
      {
          "_id": "7d141625-d186-4442-a8ee-d0884823b453",
          "name": "5 Years & 5 Months"
      },
      {
          "_id": "d4b16ea1-43e9-413a-a4cb-9dc32ffe7ad4",
          "name": "5 Years & 6 Months"
      },
      {
          "_id": "f3b1e362-9393-4dc9-a980-93c6f79a3610",
          "name": "5 Years & 7 Months"
      },
      {
          "_id": "c047625a-04ec-41bc-ab23-bd4cc3cc4544",
          "name": "5 Years & 8 Months"
      },
      {
          "_id": "34c0339e-22d1-4e90-905f-eba405538d72",
          "name": "5 Years & 9 Months"
      },
      {
          "_id": "8de513d4-d3ad-436a-a9e6-bb9c3c80ee50",
          "name": "5 Years & 10 Months"
      },
      {
          "_id": "7590bf57-8e4b-4030-97c9-fa1210677b4d",
          "name": "5 Years & 11 Months"
      },
      {
          "_id": "cedbbb77-a37a-4ef7-aab8-e95e0d230df7",
          "name": "6 Years"
      },
      {
          "_id": "39f24ce0-b5ee-45ec-bc04-83d7c7d3c8d1",
          "name": "6 Years & 1 Months"
      },
      {
          "_id": "8a9caee6-989e-4942-bf47-e98a1a9b0dac",
          "name": "6 Years & 2 Months"
      },
      {
          "_id": "3ec1819e-6bbf-4b13-a8af-e155dfeaeea7",
          "name": "6 Years & 3 Months"
      },
      {
          "_id": "7f88fa1f-304f-4474-aff1-d9a0be5d5387",
          "name": "6 Years & 4 Months"
      },
      {
          "_id": "0363d451-751d-427b-8a11-54b9daf7b756",
          "name": "6 Years & 5 Months"
      },
      {
          "_id": "31090566-b1d5-4188-b9e6-235b1795f4f6",
          "name": "6 Years & 6 Months"
      },
      {
          "_id": "2cb1246c-2c23-4ddc-942b-80314f5d9695",
          "name": "6 Years & 7 Months"
      },
      {
          "_id": "063b5a72-41a0-4eb3-8911-96f3d8728ec8",
          "name": "6 Years & 8 Months"
      },
      {
          "_id": "03ca25ab-f32b-4e21-ad72-0d3d92491f7e",
          "name": "6 Years & 9 Months"
      },
      {
          "_id": "bfab4755-8f16-4927-9569-5fed548bd12d",
          "name": "6 Years & 10 Months"
      }
  ]
  ];
  constructor(private router:Router) { }

  ngOnInit() {
    this.results=this.router.getCurrentNavigation().extras.state;
   console.log(this.results);

   this.WarrantyDuration=this.results;

  }

  check(id){
    console.log(id);
  }

}
