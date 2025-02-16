import { inject, Injectable } from "@angular/core";
import { FireStoreService } from "../../services/firestore.service";
import { Inscription } from "../models/inscription.model";

@Injectable({ providedIn: 'root' })
export class UsersService extends FireStoreService<Inscription> {
    constructor() {
      super('inscriptions');
    }
  }