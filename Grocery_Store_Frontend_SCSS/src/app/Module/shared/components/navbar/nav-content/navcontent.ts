export const navigation = {

      food :      {
        id: 'Food and Beverages',
        name: 'Food and Beverages',
        featured: [
          {
            name: 'New Arrivals',
            href: '/',
            imageSrc:'https://commonthreadco.com/cdn/shop/articles/2022_Food_Beverage_Industry_Report-V2_1200x.jpg?v=1650920884',
            imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
          },
          {
            name: 'Basic Tees',
            href: '/',
            imageSrc: 'https://media.istockphoto.com/id/1457979959/photo/snack-junk-fast-food-on-table-in-restaurant-soup-sauce-ornament-grill-hamburger-french-fries.webp?b=1&s=170667a&w=0&k=20&c=A_MdmsSdkTspk9Mum_bDVB2ko0RKoyjB7ZXQUnSOHl0=',
            imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
          },
        ],
        sections: [
          {
            id: 'Fresh Produce',
            name: 'Fresh Produce',
            items: [
              { name: ' Leafy vegetables ', id:"Leafy Vegetables" },
              { name: ' Fruits', id:" Fruits", href: '#' },
              { name: 'Vegetables', id: 'Vegetables' },
            ],
          },
          {
            id: 'Packaged_foods',
            name: 'Packaged foods',
            items: [
              { name: ' Dairy', id: 'Dairy' },
              { name: ' Meat and Seafood', id: 'Meat_and_Seafood' },
              { name: ' Pantry Staples', id: ' Pantry_Staples' },
              { name: ' Bakery and Bread ', id: ' Bakery_and_Bread ' },
              { name: ' Snacks and Beverages ', id: ' Snacks_and_Beverages ' },
            ],
          },
          {
            id: 'stores',
            name: 'Stores',
            items: [
              { name: ' shoppers stop ', id: '#' },
              { name: ' Nakshatra stores ', id: '#' },
              { name: ' D Mart ', id: '#' },
            ],
          },
        ],
      },

      household: {
        id: ' Household and Personal Care',
        name: ' Household and Personal Care',
        featured: [
          {
            name: 'New Arrivals',
            id: '#',
            imageSrc: ' https://5.imimg.com/data5/QS/TO/MY-44941618/personal-care-500x500.jpg',
            imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
          },
          {
            name: 'Artwork Tees',
            id: '#',
            imageSrc: ' https://i.ytimg.com/vi/gu5FDwBjO7M/sddefault.jpg',
            imageAlt:
              'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
          },
        ],
        sections: [
          {
            id: ' household appliances',
            name: ' household appliances',
            items: [
              { name: ' Condiments and Sauces', id: ' Condiments and Sauces' },
              { name: ' Baking and Cooking Supplies', id: ' Baking and Cooking Supplies' },              
            ],
          },
          {
            id: 'personal care',
            name: 'personal care',
            items: [
              { name: '  Personal Care', id: '  Personal Care' },
              { name: ' Household and Cleaning', id: ' Household and Cleaning' },
            ],
          },
          {
            id: 'stores',
            name: 'Stores',
            items: [
              { name: ' shoppers stop ', id: '#' },
              { name: ' Nakshatra stores ', id: '#' },
              { name: ' D Mart ', id: '#' },
            ],
          },
        ],
      },

    pages: [
      { name: 'Company', id: '/' },
      { name: 'Stores', id: '/' },
    ],
  }