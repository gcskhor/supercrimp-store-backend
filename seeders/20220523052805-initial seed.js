require("dotenv").config();
const jsSHA = require("jssha");
const SALT = process.env.SALT;

function generateHash(password) {
  const shaObj = new jsSHA("SHA-512", "TEXT", { encoding: "UTF8" });
  shaObj.update(SALT + password);
  const hash = shaObj.getHash("HEX");
  return hash;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    const password = "a";

    // ADMIN USERS
    await queryInterface.bulkInsert(
      "admin_users",
      [
        {
          name: "admin",
          email: "admin@admin.com",
          password: generateHash(password),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );

    // USERS
    const [user1, user2] = await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "User1",
          email: "1@1.com",
          password: generateHash(password),
          address_line_1: "1 some road",
          address_line_2: "#01-01",
          postal_code: "888888",
          phone: "999",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "User2",
          email: "2@2.com",
          password: generateHash(password),
          address_line_1: "2 other road",
          address_line_2: "#02-02",
          postal_code: "222222",
          phone: "98765432",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      { returning: true }
    );

    // PRODUCTS
    const products = [
      {
        name: "Tri-hard",
        description: "",
        usual_price: 60,
        current_price: 40,
        available: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Mini-hangboard",
        description: "",
        usual_price: 35,
        current_price: 25,
        available: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "All-ez",
        description: "",
        usual_price: 70,
        current_price: 45,
        available: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    const [triHard, miniHangboard, allEz] = await queryInterface.bulkInsert(
      "products",
      products,
      { returning: true }
    );

    // COLOURS
    const colours = [
      {
        name: "red",
        available: true,
        colour_code: "#FF0000",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "yellow",
        available: true,
        colour_code: "#FFFF00",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "black",
        available: true,
        colour_code: "#000000",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "hot pink",
        available: false,
        colour_code: "#FF69B4",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    const [red, yellow, black, hotPink] = await queryInterface.bulkInsert(
      "colours",
      colours,
      { returning: true }
    );

    // PRODUCTS_COLOURS
    const productsColours = [
      {
        product_id: triHard.id,
        colour_id: red.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: triHard.id,
        colour_id: yellow.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: triHard.id,
        colour_id: black.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: miniHangboard.id,
        colour_id: red.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: miniHangboard.id,
        colour_id: yellow.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: miniHangboard.id,
        colour_id: black.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: allEz.id,
        colour_id: red.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: allEz.id,
        colour_id: yellow.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: allEz.id,
        colour_id: black.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    await queryInterface.bulkInsert("products_colours", productsColours);

    // ORDERS
    const orders = [
      {
        user_id: user1.id,
        delivery_fee: 0,
        total_cost: 90,
        complete: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    const [order1] = await queryInterface.bulkInsert("orders", orders, {
      returning: true,
    });

    // ORDERS PRODUCTS
    const ordersProducts = [
      {
        order_id: order1.id,
        product_id: triHard.id,
        colour_id: red.id,
        quantity: 1,
        subtotal_cost: triHard.current_price,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        order_id: order1.id,
        product_id: miniHangboard.id,
        colour_id: yellow.id,
        quantity: 2,
        subtotal_cost: miniHangboard.current_price,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    await queryInterface.bulkInsert("orders_products", ordersProducts, {
      returning: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("orders_products", null, {});
    await queryInterface.bulkDelete("products_colours", null, {});

    await queryInterface.bulkDelete("admin_users", null, {});
    await queryInterface.bulkDelete("users", null, {});
    await queryInterface.bulkDelete("products", null, {});
    await queryInterface.bulkDelete("colours", null, {});
  },
};
