class Globals { }



class DevelopmentGlobals extends Globals {
    private port: string = "8080";

    public urls = {
        administrator: "http://localhost:" + this.port + "/admin/",
        company: "http://localhost:" + this.port + "/company/",
        customer: "http://localhost:" + this.port + "/customer/",
        guest: "http://localhost:" + this.port + "/guest/"
    }
}

class ProductionGlobals extends Globals {
    public urls = {
        administrator: "/admin/",
        company: "/company/",
        customer: "/customer/",
        guest: "/guest/",
        general: "/"
    }
}

const globals = process.env.NODE_ENV === "production" ? new ProductionGlobals() : new DevelopmentGlobals();

export default globals;