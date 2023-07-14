import template from './m28-demoData-Dashboard.html.twig';
import './m28-demoData-Dashboard.scss';


const {
    Component
} = Shopware;

const {
    Criteria
} = Shopware.Data;

Component.register('m28-demoData-Dashboard', {
    template,

    metaInfo() {
        return {
            title: this.$createTitle(),
        };
    },

    inject: [
        'repositoryFactory'
    ],

    methods: {
        getRandomInt(min = 0, max) {
            return Math.random() * (max - min) + min;
        },
        async fetchCountrys() {
            this.countryRepository.create('country');
            const criteria = new Criteria();
            criteria.setLimit(200);
            const countrysFound = await this.countryRepository.search(criteria, Shopware.Context.api)
            this.countryIds = countrysFound.map(country => country.id)

        },
        async fetchStates() {
            this.countryStateRepository.create('country_state');
            const criteria = new Criteria();
            criteria.setLimit(400);
            const countryStatesFound = await this.countryStateRepository.search(criteria, Shopware.Context.api)
            this.stateIds = countryStatesFound.map(State => State.id);

        },
        async fetchCurrencyId() {
            this.currencyRepository.create('currency');
            const criteria = new Criteria();
            criteria.setLimit(200);
            const currencysFound = await this.currencyRepository.search(criteria, Shopware.Context.api)
            currencysFound.map(currency => {
                if (currency.symbol == "€") {
                    this.currencyId = currency.id
                }
            });

        },
        async fetchLanguages() {
            this.languageRepository.create('language');
            const criteria = new Criteria();
            criteria.setLimit(200);
            const languagesFound = await this.languageRepository.search(criteria, Shopware.Context.api)
            this.languageIds = languagesFound.map(language => language.id);
        },

        async fetchSalesChannel() {
            this.salesChannelRepository.create('sales_channel');
            const criteria = new Criteria();
            criteria.setLimit(200);
            const salesChannelFound = await this.salesChannelRepository.search(criteria, Shopware.Context.api)
            console.log("salesChannelFound: ", salesChannelFound)
            for (let i = 0; i < salesChannelFound.length; i++) {
                this.salesChannelIds.push(salesChannelFound[i].id)
            }

        },

        async fetchSalutations() {
            this.salutationRepository.create('salutation');
            const criteria = new Criteria();
            criteria.setLimit(200);
            const salutationsFound = await this.salutationRepository.search(criteria, Shopware.Context.api)
            this.salutations = salutationsFound.map(salutation => salutation.id);

        },

        async fetchProducts() {
            this.productRepository.create('product');
            const criteria = new Criteria();
            criteria.setLimit(1000);
            const productsFound = await this.productRepository.search(criteria, Shopware.Context.api);
            this.products = productsFound.reduce((accumulator, product) => {
                if (product.taxId && product.price) {
                    accumulator.push({
                        taxId: product.taxId,
                        price: product.price
                    });
                }
                return accumulator;
            }, []);
        },

        async fetchRules() {
            this.ruleRepository.create('rule');
            const criteria = new Criteria();
            criteria.setLimit(200);
            const rulesFound = await this.ruleRepository.search(criteria, Shopware.Context.api)
            this.ruleIds = rulesFound.map(rule => rule.id);

        },
        generateID() { // Public Domain/MIT
            var d = new Date().getTime(); //Timestamp
            var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0; //Time in microseconds since page-load or 0 if unsupported
            return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16; //random number between 0 and 16
                if (d > 0) { //Use timestamp until depleted
                    r = (d + r) % 16 | 0;
                    d = Math.floor(d / 16);
                } else { //Use microseconds since page-load if supported
                    r = (d2 + r) % 16 | 0;
                    d2 = Math.floor(d2 / 16);
                }
                return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
        },
        getRandomFirstName() {
            const names = [
                // Male names
                "James", "John", "Robert", "Michael", "William", "David", "Joseph", "Charles", "Thomas", "Daniel",
                "Matthew", "Andrew", "Richard", "Joshua", "Christopher", "Anthony", "Brian", "Mark", "Paul", "Kevin",
                "Steven", "Edward", "Timothy", "Jason", "Jeffrey", "Ryan", "Jacob", "Gary", "Nicholas", "Eric",
                "Stephen", "Jonathan", "Larry", "Scott", "Frank", "Brandon", "Benjamin", "Gregory", "Samuel", "Peter",
                "Patrick", "Raymond", "George", "Dennis", "Jerry", "Walter", "Albert", "Sam", "Bryan", "Harry",
                "Jack", "Jeremy", "Phillip", "Aaron", "Arthur", "Adam", "Carl", "Tyler", "Ethan", "Douglas",
                "Jesse", "Philip", "Shawn", "Chad", "Bradley", "Shane", "Antonio", "Dylan", "Russell", "Danny",
                "Bobby", "Lee", "Terry", "Alex", "Derek", "Vincent", "Randy", "Erik", "Keith", "Roger",

                // Female names
                "Emma", "Olivia", "Sophia", "Isabella", "Mia", "Ava", "Emily", "Charlotte", "Amelia", "Harper",
                "Evelyn", "Abigail", "Elizabeth", "Sofia", "Ella", "Madison", "Scarlett", "Victoria", "Avery", "Grace",
                "Chloe", "Camila", "Penelope", "Riley", "Layla", "Lillian", "Nora", "Zoey", "Mila", "Aubrey",
                "Hannah", "Lily", "Addison", "Eleanor", "Natalie", "Luna", "Savannah", "Brooklyn", "Leah", "Zoe",
                "Stella", "Hazel", "Ellie", "Paisley", "Audrey", "Skylar", "Violet", "Claire", "Bella", "Aurora",
                "Lucy", "Anna", "Samantha", "Caroline", "Genesis", "Aria", "Kennedy", "Kinsley", "Allison", "Maya",
                "Sarah", "Madelyn", "Adeline", "Alexa", "Ariana", "Elena", "Gabriella", "Naomi", "Alice", "Sadie", "Dani",

                // Neutral names
                "Alex", "Taylor", "Jordan", "Sam", "Charlie", "Robin", "Bailey", "Jamie", "Casey", "Riley",
                "Avery", "Peyton", "Hayden", "Taylor", "Skyler", "Jordan", "Alexis", "Reese", "Rowan", "Emerson",
                "Finley", "Sawyer", "Harley", "Elliot", "Charlie", "River", "Rory", "Kai", "Alex", "Phoenix",
                "Parker", "Micah", "Cameron", "Blake", "Dakota", "Jaden", "Emery", "Leighton", "Kendall", "Payton",
                "Dallas", "Reagan", "Justice", "Spencer", "Elliott", "Phoenix", "Armani", "Sage", "Frankie", "Emerson"
            ];
            return names[Math.floor(Math.random() * names.length)]
        },
        getRandomLastName() {
            const lastNames = [
                // Common Last Names
                "Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor",
                "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson",
                "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "Hernandez", "King",
                "Wright", "Lopez", "Hill", "Scott", "Green", "Adams", "Baker", "Gonzalez", "Nelson", "Carter",
                "Mitchell", "Perez", "Roberts", "Turner", "Phillips", "Campbell", "Parker", "Evans", "Edwards", "Collins",
                "Stewart", "Sanchez", "Morris", "Rogers", "Reed", "Cook", "Morgan", "Bell", "Murphy", "Bailey",
                "Cooper", "Richardson", "Cox", "Howard", "Ward", "Torres", "Peterson", "Gray", "Ramirez", "James",
                "Watson", "Brooks", "Kelly", "Sanders", "Price", "Bennett", "Wood", "Barnes", "Ross", "Henderson",

                // Unique Last Names
                "Adamski", "Almeida", "Andersen", "Bachman", "Berg", "Blanc", "Boyd", "Cavalcanti", "Choi", "Cruz",
                "Dumont", "Dupont", "Ferrari", "Fletcher", "Gupta", "Hampton", "Hayashi", "Huang", "Ivanov", "Jansen",
                "Kimura", "Larsen", "Lefebvre", "Li", "Lopez", "Matsuda", "Moreau", "Nakashima", "Nguyen", "Novak",
                "Olsen", "O'Reilly", "O'Sullivan", "Petrov", "Popov", "Ribeiro", "Ricci", "Saito", "Schmidt", "Silva",
                "Singh", "Souza", "Suzuki", "Takahashi", "Tanaka", "Taylor", "Tran", "Vargas", "Vasquez", "Yamamoto"
            ];
            return lastNames[Math.floor(Math.random() * lastNames.length)]
        },
        getRandomStreet() {
            const streetNames = [
                // Common Street Names
                "Main Street", "First Street", "Park Avenue", "Elm Street", "Maple Avenue", "Oak Street", "Cedar Lane", "Washington Street", "Church Road", "Lakeview Drive",
                "Pine Street", "High Street", "Broadway", "Hillside Avenue", "Chestnut Street", "Center Street", "Riverside Drive", "Smith Street", "West Street", "North Avenue",
                "Cherry Lane", "Sunset Boulevard", "Willow Street", "Mill Road", "School Street", "Madison Avenue", "Maple Street", "Lincoln Avenue", "Prospect Street", "Franklin Street",
                "Grove Street", "Forest Avenue", "Hickory Lane", "Spruce Street", "Meadow Lane", "Birch Street", "Railroad Avenue", "Victory Lane", "College Road", "Court Street",
                "Market Street", "Broad Street", "Pleasant Street", "Valley Road", "Mulberry Street", "Ocean Avenue", "Hillcrest Drive", "Peachtree Street", "River Road", "Highland Avenue",
                "Rose Street", "Cottage Lane", "Magnolia Drive", "Crescent Avenue", "Lake Street", "Orchard Lane", "Pond View Drive", "South Street", "Springfield Avenue", "Cambridge Road",

                // Unique Street Names
                "Abbey Road", "Acacia Avenue", "Amber Drive", "Blossom Lane", "Cobalt Way", "Daisy Lane", "Emerald Street", "Falcon Crest", "Golden Gate", "Harmony Lane",
                "Ivy Lane", "Jasmine Court", "Kingsley Avenue", "Larkspur Lane", "Meadowbrook Drive", "Noble Street", "Oxford Road", "Peachtree Lane", "Quail Hollow", "Ridgeview Drive",
                "Sycamore Street", "Tulip Lane", "Violet Avenue", "Whispering Pines", "Xavier Street", "Yarrow Court", "Zephyr Way"
            ];

            return streetNames[Math.floor(Math.random() * streetNames.length)] + this.getRandomInt(1, 150)
        },
        getRandomCity() {
            const cityNames = [
                // United States
                "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose",
                "Austin", "Jacksonville", "San Francisco", "Columbus", "Indianapolis", "Fort Worth", "Charlotte", "Seattle", "Denver", "Washington, D.C.",
                "Boston", "El Paso", "Detroit", "Nashville", "Portland", "Memphis", "Oklahoma City", "Las Vegas", "Louisville", "Baltimore",
                "Atlanta", "Miami", "Minneapolis", "New Orleans", "Kansas City", "Tampa", "Orlando", "St. Louis", "Pittsburgh", "Cincinnati",
                "Raleigh", "Austin", "Sacramento", "Milwaukee", "Salt Lake City", "San Bernardino", "Omaha", "Hartford", "Albuquerque", "Charleston",

                // United Kingdom
                "London", "Birmingham", "Manchester", "Glasgow", "Leeds", "Liverpool", "Newcastle", "Sheffield", "Bristol", "Edinburgh",
                "Cardiff", "Belfast", "Nottingham", "Southampton", "Leicester", "Aberdeen", "Brighton", "Bournemouth", "Cambridge", "Oxford",
                "York", "Portsmouth", "Swansea", "Coventry", "Milton Keynes", "Reading", "Norwich", "Stoke-on-Trent", "Plymouth", "Sunderland",
                "Wolverhampton", "Derby", "Salford", "Leicester", "Bradford", "Kingston upon Hull", "Preston", "Newport", "Swindon", "Southend-on-Sea",
                "Peterborough", "Oxford", "Cambridge", "Exeter", "York", "Brighton", "Gloucester", "Poole", "Dundee", "Wrexham",

                // Canada
                "Toronto", "Montreal", "Vancouver", "Calgary", "Edmonton", "Ottawa", "Winnipeg", "Quebec City", "Hamilton", "London",
                "Halifax", "Victoria", "Kitchener", "Burnaby", "Saskatoon", "Regina", "St. Catharines", "Kelowna", "Barrie", "Sherbrooke",
                "Kingston", "Abbotsford", "Guelph", "Thunder Bay", "Lethbridge", "Moncton", "Saint John", "Surrey", "Nanaimo", "Red Deer",
                "Brantford", "Chatham-Kent", "Saint-Jérôme", "Drummondville", "Fredericton", "Sarnia", "Saint-Hyacinthe", "Granby", "Moose Jaw", "Prince Albert",
                "Wood Buffalo", "Grande Prairie", "Saint John's", "North Bay", "Medicine Hat", "Norfolk County", "Newmarket", "Peterborough", "Kawartha Lakes", "Chilliwack",

                // Australia
                "Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast", "Newcastle", "Canberra", "Sunshine Coast", "Wollongong",
                "Geelong", "Hobart", "Townsville", "Cairns", "Darwin", "Toowoomba", "Ballarat", "Bendigo", "Albury", "Launceston",
                "Mackay", "Rockhampton", "Bunbury", "Bundaberg", "Hervey Bay", "Wagga Wagga", "Coffs Harbour", "Gladstone", "Mildura", "Shepparton",
                "Wollongong", "Warrnambool", "Kalgoorlie", "Devonport", "Mount Gambier", "Alice Springs", "Geraldton", "Bunbury", "Bundaberg", "Goulburn",
                "Cessnock", "Dubbo", "Katherine", "Busselton", "Port Hedland", "Karratha", "Katoomba", "Gympie", "Maryborough", "Kwinana",

                // Germany
                "Berlin", "Hamburg", "Munich", "Cologne", "Frankfurt", "Stuttgart", "Düsseldorf", "Dortmund", "Essen", "Leipzig",
                "Bremen", "Dresden", "Hanover", "Nuremberg", "Duisburg", "Bochum", "Wuppertal", "Bielefeld", "Bonn", "Münster",
                "Karlsruhe", "Mannheim", "Augsburg", "Wiesbaden", "Gelsenkirchen", "Mönchengladbach", "Braunschweig", "Chemnitz", "Kiel", "Aachen",
                "Magdeburg", "Freiburg", "Lübeck", "Erfurt", "Rostock", "Kassel", "Hagen", "Saarbrücken", "Mainz", "Hamm",
                "Ludwigshafen", "Mülheim", "Oberhausen", "Leverkusen", "Oldenburg", "Neuss", "Heidelberg", "Potsdam", "Darmstadt", "Würzburg",

                // Austria
                "Vienna", "Graz", "Linz", "Salzburg", "Innsbruck", "Klagenfurt", "Villach", "Wels", "Sankt Pölten", "Dornbirn",
                "Wiener Neustadt", "Steyr", "Feldkirch", "Bregenz", "Leonding", "Klosterneuburg", "Baden", "Wolfsberg", "Leoben", "Krems",
                "Traun", "Amstetten", "Lustenau", "Kapfenberg", "Hallein", "Mödling", "Schwechat", "Bludenz", "Gmunden", "Klagenfurt am Wörthersee",

                // Switzerland
                "Zurich", "Geneva", "Basel", "Bern", "Lausanne", "Lucerne", "Winterthur", "St. Gallen", "Lugano", "Bienna",
                "Thun", "Köniz", "La Chaux-de-Fonds", "Schaffhausen", "Fribourg", "Vernier", "Chur", "Neuchâtel", "Uster", "Sion",
                "Luzern", "Zug", "Yverdon-les-Bains", "Dübendorf", "Kriens", "Rapperswil-Jona", "Schlieren", "Allschwil", "Baar", "Bellinzona",

                // Netherlands
                "Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven", "Tilburg", "Groningen", "Almere", "Breda", "Nijmegen",
                "Enschede", "Haarlem", "Arnhem", "Zaanstad", "Amersfoort", "Apeldoorn", "Hoofddorp", "Maastricht", "Leiden", "Dordrecht",
                "Zoetermeer", "Zwolle", "Deventer", "Delft", "Alkmaar", "Heerlen", "Venlo", "Leeuwarden", "Amsterdam-Zuidoost", "Hilversum",
                "Gouda", "Assen", "Spijkenisse", "Vlaardingen", "Almelo", "Emmen", "Kerkrade", "Bergen op Zoom", "Roosendaal", "Purmerend",

                // Italy
                "Rome", "Milan", "Naples", "Turin", "Palermo", "Genoa", "Bologna", "Florence", "Venice", "Verona",
                "Messina", "Padua", "Trieste", "Bari", "Brescia", "Parma", "Taranto", "Prato", "Reggio Calabria", "Modena",
                "Cagliari", "Livorno", "Foggia", "Perugia", "Ravenna", "Salerno", "Rimini", "Ferrara", "Sassari", "Latina",
                "Giugliano in Campania", "Monza", "Syracuse", "Bergamo", "Pescara", "Trento", "Forlì", "Vicenza", "Terni", "Bolzano",

                // Sweden
                "Stockholm", "Gothenburg", "Malmö", "Uppsala", "Västerås", "Örebro", "Linköping", "Helsingborg", "Jönköping", "Norrköping",
                "Lund", "Umeå", "Gävle", "Borås", "Södertälje", "Eskilstuna", "Halmstad", "Växjö", "Karlstad", "Trollhättan",
                "Luleå", "Mölndal", "Uddevalla", "Skövde", "Karlskrona", "Kristianstad", "Vänersborg", "Nyköping", "Hudiksvall", "Landskrona",
                "Tumba", "Täby", "Alingsås", "Kiruna", "Mora", "Sandviken", "Vallentuna", "Ystad", "Falköping", "Åkersberga",

                // Hungary
                "Budapest", "Debrecen", "Szeged", "Miskolc", "Pécs", "Győr", "Nyíregyháza", "Kecskemét", "Székesfehérvár", "Szombathely",
                "Szolnok", "Tatabánya", "Kaposvár", "Veszprém", "Békéscsaba", "Zalaegerszeg", "Eger", "Nagykanizsa", "Dunaújváros", "Sopron",
                "Hódmezővásárhely", "Pécs", "Szombathely", "Kecskemét", "Székesfehérvár", "Ajka", "Siófok", "Salgótarján", "Vác", "Gödöllő",

                // Slovenia
                "Ljubljana", "Maribor", "Celje", "Kranj", "Velenje", "Koper", "Novo Mesto", "Ptuj", "Trbovlje", "Kamnik",
                "Jesenice", "Nova Gorica", "Domžale", "Škofja Loka", "Murska Sobota", "Kranj", "Koper", "Postojna", "Ptuj", "Nova Gorica",
                "Logatec", "Vrhnika", "Slovenj Gradec", "Kočevje", "Ravne na Koroškem", "Krško", "Ajdovščina", "Brezice", "Litija", "Sevnica",

                // Greece
                "Athens", "Thessaloniki", "Patras", "Heraklion", "Larissa", "Volos", "Ioannina", "Chania", "Rhodes", "Kavala",
                "Alexandroupoli", "Chalkida", "Komotini", "Tripoli", "Lamia", "Irakleio", "Katerini", "Mitilini", "Kalamata", "Serres",
                "Drama", "Veria", "Mytilene", "Agrinio", "Kozani", "Giannitsa", "Trikala", "Larissa", "Korinthos", "Rethymno",
                "Xanthi", "Chios", "Pyrgos", "Amaliada", "Karditsa", "Thiva", "Naousa", "Kastoria", "Arta", "Preveza",

                // Spain
                "Madrid", "Barcelona", "Valencia", "Seville", "Zaragoza", "Málaga", "Murcia", "Palma", "Las Palmas", "Bilbao",
                "Alicante", "Córdoba", "Valladolid", "Vigo", "Gijón", "Eixample", "L'Hospitalet de Llobregat", "Latina", "Carabanchel", "A Coruña",
                "Puente de Vallecas", "Sant Martí", "Gasteiz / Vitoria", "Granada", "Elche", "Oviedo", "Terrassa", "Badalona", "Cartagena", "Sabadell",
                "Móstoles", "Santa Cruz de Tenerife", "Alcalá de Henares", "Pamplona", "Fuenlabrada", "Almería", "Leganés", "Donostia / San Sebastián", "Santander", "Burgos"
            ];

            return cityNames[Math.floor(Math.random() * cityNames.length)]

        },
        randomDate(start, end) {
            return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        },
        createProcutPrice() {
            const numberOfProducts = this.getRandomInt(1, 10);
            let netPrice = 0;
            let rawTotal = 0;
            const taxRules = [];

            const taxPromises = [];

            for (let i = 0; i < numberOfProducts; i++) {
                const product = this.products[i];

                this.taxRepository.create('tax');
                const criteria = new Criteria();
                criteria.setLimit(200);

                const taxPromise = this.taxRepository.search(criteria, Shopware.Context.api)
                    .then(taxes => {
                        const tax = taxes[0]; // Assuming you want to use the first tax object
                        const taxRule = {
                            taxRate: tax.taxRate,
                            extensions: [],
                            percentage: 100,
                            taxStatus: "gross",
                            totalPrice: product.price[0].gross,
                            positionPrice: product.price[0].gross,
                            calculatedTaxes: [{
                                tax: product.price[0].gross * tax.taxRate,
                                price: product.price[0].gross,
                                taxRate: tax.taxRate,
                                extensions: [],
                            }]
                        };
                        netPrice += Object.values(product.price)[0].gross - Object.values(product.price)[0].gross * tax.taxRate;
                        rawTotal += Object.values(product.price)[0].gross;
                        taxRules.push(taxRule);
                    });

                taxPromises.push(taxPromise);
            }

            return Promise.all(taxPromises)
                .then(() => {
                    return {
                        price: {
                            netPrice: netPrice,
                            rawTotal: rawTotal,
                            totalPrice: rawTotal,
                            taxRules: taxRules,
                            calculatedTaxes: rawTotal - rawTotal,
                            taxStatus: "gross",
                            positionPrice: rawTotal
                        },
                        amountTotal: rawTotal,
                        amountNet: netPrice,
                        positionPrice: rawTotal
                    };
                });
        },
        createOrderAddress(orderId, versionId, countryId, time) {
            const orderAddress = this.orderAddressRepository.create(Shopware.Context.api)
            orderAddress.countryStateId = null
            orderAddress.salutation = this.salutations[Math.floor(Math.random() * this.salutations.length)]
            orderAddress.firstName = this.getRandomFirstName()
            orderAddress.lastName = this.getRandomLastName()
            orderAddress.street = this.getRandomStreet()
            orderAddress.zipcode = this.getRandomInt(0, 99999)
            orderAddress.versionId = versionId
            orderAddress.countryId = countryId
            orderAddress.orderId = orderId
            orderAddress.company = null
            orderAddress.department = null
            orderAddress.title = null
            orderAddress.vatId = null
            orderAddress.phoneNumber = this.getRandomInt(100000, 99999999)
            orderAddress.additionalAddressLine1 = null
            orderAddress.additionalAddressLine2 = null
            orderAddress.customFields = null
            orderAddress.createdAt = time
            orderAddress.updatedAt = null
            this.orderAddressRepository.save(orderAddress, Shopware.Context.api)
        },
        async createOrders() {
            this.loading = true
            this.current = 0
            await this.fetchCountrys();
            await this.fetchSalesChannel();
            await this.fetchSalutations();
            await this.fetchProducts();
            await this.fetchRules();
            await this.fetchLanguages();
            await this.fetchCurrencyId();
            await this.fetchStates();
            console.log("this.salesChannelIds: ", this.salesChannelIds)
            for (let i = 0; i < this.orderNumber; i++) {
                this.order = this.orderRepository.create(Shopware.Context.api);
                this.order.orderDateTime = this.randomDate(new Date(2016, 15, 7), new Date());
                this.order.countryId = this.countryIds[Math.floor(Math.random() * this.countryIds.length)];
                this.order.stateId = this.stateIds[Math.floor(Math.random() * this.stateIds.length)];;;
                this.order.currencyId = this.currencyId;
                this.order.languageId = this.languageIds[Math.floor(Math.random() * this.languageIds.length)];;
                this.order.currencyFactor = 1;
                this.order.salesChannelId = this.salesChannelIds[Math.floor(Math.random() * this.salesChannelIds.length)];
                this.order.versionId = this.generateID();
                this.order.billingAddressId = this.order.versionId;
                const productData = this.createProcutPrice();
                this.order.price = productData.price;
                this.order.orderDate = this.order.orderDateTime.toISOString().split('T')[0];
                this.order.amountTotal = productData.amountTotal;
                this.order.amountNet = productData.amountNet;
                this.order.positionPrice = productData.positionPrice;
                this.order.taxStatus = "gross";
                this.order.shippingCosts = {
                    quantity: 1,
                    taxRules: [{
                        taxRate: 19,
                        extensions: [],
                        percentage: 100
                    }],
                    listPrice: null,
                    unitPrice: 0,
                    totalPrice: 0,
                    referencePrice: null,
                    calculatedTaxes: [{
                        tax: 0,
                        price: 0,
                        taxRate: 19,
                        extensions: []
                    }],
                    regulationPrice: null
                };
                this.order.shippingTotal = 0;
                this.order.deepLinkCode = "aisjdasdiu9asdu98asudasd89u";
                this.order.customFields = null;
                this.order.affilateCode = null;
                this.order.campagnCode = null;
                this.order.customerComment = null;
                this.order.createdAt = this.order.orderDateTime;
                this.order.updatedAt = null;
                this.order.itemRounding = {
                    decimals: 2,
                    interval: 0.01,
                    roundForNet: true
                };
                this.order.totalRounding = {
                    decimals: 2,
                    interval: 0.01,
                    roundForNet: true
                };
                const rules = [];
                const ruleAmount = this.getRandomInt(0, this.ruleIds.length - 1);
                for (let j = 0; j < ruleAmount; j++) {
                    rules.push(this.ruleIds[j]);
                }
                this.order.createdById = null;
                this.order.updatedById = null;
                this.order.rules = rules;
                console.log("ima save this: ", this.order)
                const completeOrder = this.orderRepository.save(this.order, Shopware.Context.api);
                console.log("Complete Order: ", completeOrder);
                this.createOrderAddress(completeOrder.id, this.order.versionId, this.order.countryId, this.order.orderDateTime);
                this.current += 1
            }
            this.loading = false
        },
    },

    data() {
        return {
            current: 0,
            loading: false,
            orderNumber: 0,
            countryIds: [],
            salesChannelIds: [],
            salutations: [],
            products: [],
            ruleIds: [],
            languageIds: [],
            currencyId: null,
            stateIds: [],
            order: undefined,
            entity: undefined,
        };
    },

    created() {
        this.entity = this.manufacturerRepository.create(Shopware.Context.api);

        this.entity.name = 'test';
        this.entity.link = 'https://google.com';

        this.manufacturerRepository.save(this.entity, Shopware.Context.api);
    },

    computed: {
        manufacturerRepository() {
            return this.repositoryFactory.create('product_manufacturer');
        },
        orderRepository() {
            return this.repositoryFactory.create('order');
        },
        orderAddressRepository() {
            return this.repositoryFactory.create('order_address');
        },
        countryRepository() {
            return this.repositoryFactory.create('country');
        },
        countryStateRepository() {
            return this.repositoryFactory.create('country_state');
        },
        currencyRepository() {
            return this.repositoryFactory.create('currency');
        },
        languageRepository() {
            return this.repositoryFactory.create('language');
        },
        salesChannelRepository() {
            return this.repositoryFactory.create('sales_channel');
        },
        salutationRepository() {
            return this.repositoryFactory.create('salutation');
        },
        productRepository() {
            return this.repositoryFactory.create('product');
        },
        ruleRepository() {
            return this.repositoryFactory.create('rule');
        },
        taxRepository() {
            return this.repositoryFactory.create('tax');
        },
        columns() {
            // Add your computed logic here
        }
    },
});