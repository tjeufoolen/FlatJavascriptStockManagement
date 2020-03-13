const { View } = require('../View');

export class NavbarComponent extends View {
    constructor(controller) {
        super();

        // The root element
        this.root = document.body;

        // The navbar
        this.nav = this.createElement("nav", ["navbar", "navbar-expand-lg", "navbar-light","bg-light"]);
        
        // The container to center the items inside the nav
        this.container = this.createElement("div", ["container"]);
        
        // The main link/logo
        this.link = this.createElement("a", ["navbar-brand"]);
        this.link.innerText = process.env.SITE_NAME;
        this.link.href = "/";
        
        // The mobile hamburger menu
        this.hamburgerBtn = this.createElement("button", ["navbar-toggler"]);
        this.hamburgerBtn.type = "button";
        this.hamburgerBtn.dataset.toggle = "collapse";
        this.hamburgerBtn.dataset.target = "#navbarNavAltMarkup";
        this.hamburgerBtn.setAttribute("aria-controls", "navbarNavAltMarkup");
        this.hamburgerIcon = this.createElement("span", ["navbar-toggler-icon"]);
        this.hamburgerBtn.appendChild(this.hamburgerIcon);

        // The menu items
        this.navbarMenu = this.createElement("div", ["collapse", "navbar-collapse", "justify-content-end"]);
        this.navbarMenu.id = "navbarNavAltMarkup";
        this.navbarMenuList = this.createElement("div", ["navbar-nav"]);
        controller.menuItems.forEach(item => {
            let menuItem = this.createElement("span", ["nav-item", "nav-link"]);
            menuItem.onclick = () => controller.switchPage(item.page);
            menuItem.innerText = item.title;
            this.navbarMenuList.appendChild(menuItem);
        })

        // Append the menuItems to its own container
        this.navbarMenu.appendChild(this.navbarMenuList);

        // Append the link/logo, the hamburger icon and the menu items to the navbar container
        this.container.appendChild(this.link);
        this.container.appendChild(this.hamburgerBtn);
        this.container.appendChild(this.navbarMenu);

        // Append the navbar containter to the navbar
        this.nav.appendChild(this.container);

        // Append the navbar to the root
        this.root.appendChild(this.nav);
    }
}