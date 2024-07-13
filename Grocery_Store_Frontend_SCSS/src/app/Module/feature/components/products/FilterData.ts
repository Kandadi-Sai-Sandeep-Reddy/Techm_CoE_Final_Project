export const filters=[
    {
        id:"color",
        name: "Color",
        options: [
            { value: "white", label : "White"},
            { value: "beige", label : "Beige"},
            { value: "blue", label : "Blue"},
            { value: "brown", label : "Brown"},
            { value: "green", label : "Green"},
        ],
    },

    {
        id: "size",
        name: "Size",
        options: [
            { value: "KG", label: "KG"},
            { value: "G", label: "G"},
            { value: "L", label: "Litre"},
            { value: "mL", label: "mL"},

        ],
    },

];

export const singleFilter=[
    {
        id: "price",
        name: "Price",
        options: [
            { value: "9-39", label : "Rs.9 To Rs.39"},
            { value: "39-99", label: "Rs.39 To Rs.99"},
            { value:"99-199", label:"Rs.99 To Rs.199"},
            { value: "199-299", label : "Rs.199 To Rs.299"},
            { value: "299-499", label: "Rs.299 To Rs.499"},

        ],
    },
    {
        id: "discount",
        name: "Discount Range",
        options : [
            {
                value: "10",
                label: "10% and Above"
            },
            { value: "20", label: "20% and Above"},
            { value: "30", label: "30% and Above"},
            { value: "40", label: "40% and Above"},
        ],
    },
    {
        id: "stock",
        name: "Avalability",
        options: [
            { value: "in_stock", label:"In stock"},
            { value: "out_of_stock", label:"Out of stock"},
        ],
    },
];