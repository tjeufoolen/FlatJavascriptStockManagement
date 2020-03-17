import { StorageController } from "./StorageController";

import { NavbarController } from "./components/NavbarController";
import { ContentController } from "./components/ContentController";

import { WeatherService } from "../services/WeatherService";

export class AppController {
    constructor() {
        // Setup project
        this.init();

        // Load components
        this.navbar = new NavbarController(this);
        this.content = new ContentController(this);
    }

    init() {
        // Set global constants
        this.constants = {
            "pages": {
                WAREHOUSE: 'warehouse',
                PRODUCTS: 'products',
                CREATE_PRODUCT: 'createProduct'
            }
        }

        // Set global enums
        this.enums = {
            "categoryTypes": {
                FRILLS: 'Tierlantijn',
                DECORATION: 'Decoratie',
                CLOTHING: 'Kleding'
            },
            "regionTypes": {
                PASSAGE: 'passage',
                STORAGE: 'storage'
            }
        };

        // Initialize storage
        this.storage = new StorageController(this);
    }
}