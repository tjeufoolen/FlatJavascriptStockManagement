import { StorageController } from "./StorageController";

import { NavbarController } from "./components/NavbarController";
import { ContentController } from "./components/ContentController";

import { WeatherService } from "../services/WeatherService";

export class AppController {
    constructor() {
        // Setup project
        this.init();

        // Register services (singleton)
        this.services = {
            weather: new WeatherService()
        }

        // Load components
        this.navbar = new NavbarController(this);
        this.content = new ContentController(this);
    }

    init() {
        // Set global constants
        this.constants = {
            "pages": {
                CREATE_PRODUCT: 'createProduct',
                EDIT_PRODUCT: 'editProduct',
                PRODUCTS: 'products',
                WAREHOUSE: 'warehouse',
                WEATHER: 'weather',
            }
        }

        // Set global enums
        this.enums = {
            "categoryTypes": {
                CLOTHING: 'Kleding',
                DECORATION: 'Decoratie',
                FRILLS: 'Tierlantijn',
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