'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert("product", [{
      id: 1,
      img: "img/product/1669463143772_일산방어.jpg",
      name: "일산 방어",
      price: 198000,
      unit: "1마리",
      weight: "9kg",
      origin: "일본산",
      category: "수산물",
      content: `<p><img src="http://localhost/img/editor/1669612184404_sample.jpg" alt="img/editor/1669612184404_sample.jpg" contenteditable="false"><br></p>`,
      userID: 2
    }, {
      id: 2,
      img: "img/product/1669463184852_단새우.jpg",
      name: "단새우",
      price: 100000,
      unit: "1박스",
      weight: "2kg",
      origin: "국내산",
      category: "수산물",
      content: `<p><img src="http://localhost/img/editor/1669612184404_sample.jpg" alt="img/editor/1669612184404_sample.jpg" contenteditable="false"><br></p>`,
      userID: 2
    }, {
      id: 3,
      img: "img/product/1669463197646_무늬오징어.jpg",
      name: "무늬오징어",
      price: 65000,
      unit: "1박스",
      weight: "2kg",
      origin: "국내산",
      category: "수산물",
      content: `<p><img src="http://localhost/img/editor/1669612184404_sample.jpg" alt="img/editor/1669612184404_sample.jpg" contenteditable="false"><br></p>`,
      userID: 2
    }, {
      id: 4,
      img: "img/product/1669463207633_광어.jpg",
      name: "광어",
      price: 81000,
      unit: "1마리",
      weight: "3kg",
      origin: "완도산",
      category: "수산물",
      content: `<p><img src="http://localhost/img/editor/1669612184404_sample.jpg" alt="img/editor/1669612184404_sample.jpg" contenteditable="false"><br></p>`,
      userID: 2
    }, {
      id: 5,
      img: "img/product/1669463216713_참돔.jpg",
      name: "참돔",
      price: 69000,
      unit: "1마리",
      weight: "3kg",
      origin: "일본산",
      category: "수산물",
      content: `<p><img src="http://localhost/img/editor/1669612184404_sample.jpg" alt="img/editor/1669612184404_sample.jpg" contenteditable="false"><br></p>`,
      userID: 2
    }, {
      id: 6,
      img: "img/product/1669463227154_돌돔.jpg",
      name: "돌돔",
      price: 210000,
      unit: "1마리",
      weight: "1.5kg",
      origin: "국내산",
      category: "수산물",
      content: `<p><img src="http://localhost/img/editor/1669612184404_sample.jpg" alt="img/editor/1669612184404_sample.jpg" contenteditable="false"><br></p>`,
      userID: 2
    }, {
      id: 7,
      img: "img/product/1669463266074_갈치.jpg",
      name: "갈치",
      price: 70000,
      unit: "1마리",
      weight: "1.7kg",
      origin: "국내산",
      category: "수산물",
      content: `<p><img src="http://localhost/img/editor/1669612184404_sample.jpg" alt="img/editor/1669612184404_sample.jpg" contenteditable="false"><br></p>`,
      userID: 2
    }, {
      id: 8,
      img: "img/product/1669463273492_모듬 세트.jpg",
      name: "모듬 세트",
      price: 100000,
      salePrice: 33000,
      salePct: 67,
      unit: "1팩",
      weight: "2kg",
      origin: "복합",
      category: "수산물",
      content: `<p><img src="http://localhost/img/editor/1669612184404_sample.jpg" alt="img/editor/1669612184404_sample.jpg" contenteditable="false"><br></p>`,
      userID: 2
    }, {
      id: 9,
      img: "img/product/1669463282431_삼치.jpg",
      name: "삼치",
      price: 52000,
      unit: "1마리",
      weight: "4kg",
      origin: "국내산",
      category: "수산물",
      content: `<p><img src="http://localhost/img/editor/1669612184404_sample.jpg" alt="img/editor/1669612184404_sample.jpg" contenteditable="false"><br></p>`,
      userID: 2
    }, {
      id: 10,
      img: "img/product/1669463289236_숭어.jpg",
      name: "숭어",
      price: 22000,
      unit: "1마리",
      weight: "2kg",
      origin: "국내산",
      category: "수산물",
      content: `<p><img src="http://localhost/img/editor/1669612184404_sample.jpg" alt="img/editor/1669612184404_sample.jpg" contenteditable="false"><br></p>`,
      userID: 2
    }, {
      id: 11,
      img: "img/product/1669632297275_레몬.jpg",
      name: "레몬",
      price: 8000,
      unit: "1팩",
      weight: "500g",
      origin: "수입산",
      category: "과일",
      content: `<p><img src="http://localhost/img/editor/1669640536455_레몬.jpg" alt="img/editor/1669640536455_레몬.jpg" contenteditable="false"><br></p>`,
      userID: 2
    }, {
      id: 12,
      img: "img/product/1669632311317_멜론.jpg",
      name: "멜론",
      price: 12000,
      unit: "1개",
      weight: "1.5kg",
      origin: "국내산",
      category: "과일",
      content: `<p><img src="http://localhost/img/editor/1669640543020_멜론.jpg" alt="img/editor/1669640543020_멜론.jpg" contenteditable="false"><br></p>`,
      userID: 2
    }, {
      id: 13,
      img: "img/product/1669632317789_바나나.jpg",
      name: "바나나",
      price: 3500,
      unit: "1송이",
      weight: "8손",
      origin: "수입산",
      category: "과일",
      content: `<p><img src="http://localhost/img/editor/1669640549090_바나나.jpg" alt="img/editor/1669640549090_바나나.jpg" contenteditable="false"><br></p>`,
      userID: 2
    }, {
      id: 14,
      img: "img/product/1669632324217_샤인머스켓.jpg",
      name: "샤인머스켓",
      price: 25000,
      unit: "1박스",
      weight: "2kg",
      origin: "국내산",
      category: "과일",
      content: `<p><img src="http://localhost/img/editor/1669640555561_샤인머스켓.jpg" alt="img/editor/1669640555561_샤인머스켓.jpg" contenteditable="false"><br></p>`,
      userID: 2
    }, {
      id: 15,
      img: "img/product/1669632331721_대추방울토마토.jpg",
      name: "대추방울토마토",
      price: 5500,
      unit: "1팩",
      weight: "500g",
      origin: "국내산",
      category: "과일",
      content: `<p><img src="http://localhost/img/editor/1669640488192_대추방울토마토.jpg" alt="img/editor/1669640488192_대추방울토마토.jpg" contenteditable="false"><br></p>`,
      userID: 2
    }, {
      id: 16,
      img: "img/product/1669632337456_딸기.jpg",
      name: "딸기",
      price: 8900,
      unit: "1팩",
      weight: "500g",
      origin: "국내산",
      category: "과일",
      content: `<p><img src="http://localhost/img/editor/1669640506949_딸기.jpg" alt="img/editor/1669640506949_딸기.jpg" contenteditable="false"><br></p>`,
      userID: 2
    }, {
      id: 17,
      img: "img/product/1669632343290_아보카도.jpg",
      name: "아보카도",
      price: 8000,
      unit: "1팩",
      weight: "500g",
      origin: "수입산",
      category: "과일",
      content: `<p><img src="http://localhost/img/editor/1669640562083_아보카도.jpg" alt="img/editor/1669640562083_아보카도.jpg" contenteditable="false"><br></p>`,
      userID: 2
    }, {
      id: 18,
      img: "img/product/1669632351125_컷팅파인애플.jpg",
      name: "컷팅파인애플",
      price: 9900,
      unit: "1팩",
      weight: "1kg",
      origin: "수입산",
      category: "과일",
      content: `<p><img src="http://localhost/img/editor/1669640578502_파인애플.jpg" alt="img/editor/1669640578502_파인애플.jpg" contenteditable="false"><br></p>`,
      userID: 2
    }, {
      id: 19,
      img: "img/product/1669632357151_키위.jpg",
      name: "키위",
      price: 6500,
      unit: "1팩",
      weight: "660g",
      origin: "수입산",
      category: "과일",
      content: `<p><img src="http://localhost/img/editor/1669640571414_키위.jpg" alt="img/editor/1669640571414_키위.jpg" contenteditable="false"><br></p>`,
      userID: 2
    }, {
      id: 20,
      img: "img/product/1669632363297_포도.jpg",
      name: "포도",
      price: 38000,
      unit: "1박스",
      weight: "3kg",
      origin: "국내산",
      category: "과일",
      content: `<p><img src="http://localhost/img/editor/1669640584848_포도.jpg" alt="img/editor/1669640584848_포도.jpg" contenteditable="false"><br></p>`,
      userID: 2
    }, {
      id: 21,
      img: "img/product/1669632174194_감자.jpg",
      name: "감자",
      price: 38000,
      unit: "1박스",
      weight: "10kg",
      origin: "국내산",
      category: "야채",
      content: `<p><img src="http://localhost/img/editor/1669662609190_감자.jpg" alt="img/editor/1669662609190_감자.jpg" contenteditable="false"><br></p>`,
      userID: 2
    }, {
      id: 22,
      img: "img/product/1669632188106_고구마.jpg",
      name: "고구마",
      price: 46200,
      unit: "1박스",
      weight: "10kg",
      origin: "국내산",
      category: "야채",
      content: `<p><img src="http://localhost/img/editor/1669662621725_고구마.jpg" alt="img/editor/1669662621725_고구마.jpg" contenteditable="false"><br></p>`,
      userID: 2
    }, {
      id: 23,
      img: "img/product/1669632194964_노루궁뎅이버섯.jpg",
      name: "노루궁뎅이버섯",
      price: 4200,
      unit: "1팩",
      weight: "200g",
      origin: "국내산",
      category: "야채",
      content: `<p><img src="http://localhost/img/editor/1669662627953_노루궁뎅이버섯.jpg" alt="img/editor/1669662627953_노루궁뎅이버섯.jpg" contenteditable="false"><br></p>`,
      userID: 2
    }, {
      id: 24,
      img: "img/product/1669632201372_느타리.jpg",
      name: "느타리",
      price: 1000,
      unit: "1팩",
      weight: "200g",
      origin: "국내산",
      category: "야채",
      content: `<p><img src="http://localhost/img/editor/1669662633702_느타리.jpg" alt="img/editor/1669662633702_느타리.jpg" contenteditable="false"><br></p>`,
      userID: 2
    }, {
      id: 25,
      img: "img/product/1669632207929_무.jpg",
      name: "무",
      price: 2800,
      unit: "1개",
      weight: "1kg",
      origin: "국내산",
      category: "야채",
      content: `<p><img src="http://localhost/img/editor/1669662640231_무.jpg" alt="img/editor/1669662640231_무.jpg" contenteditable="false"><br></p>`,
      userID: 2
    }, {
      id: 26,
      img: "img/product/1669632229824_부추.jpg",
      name: "부추",
      price: 2800,
      unit: "1단",
      weight: "200g",
      origin: "국내산",
      category: "야채",
      content: `<p><img src="http://localhost/img/editor/1669662645760_부추.jpg" alt="img/editor/1669662645760_부추.jpg" contenteditable="false"><br></p>`,
      userID: 2
    }, {
      id: 27,
      img: "img/product/1669632236220_아스파라거스.jpg",
      name: "아스파라거스",
      price: 4600,
      unit: "1팩",
      weight: "150g",
      origin: "수입산",
      category: "야채",
      content: `<p><img src="http://localhost/img/editor/1669662652041_아스파라거스.jpg" alt="img/editor/1669662652041_아스파라거스.jpg" contenteditable="false"><br></p>`,
      userID: 2
    }, {
      id: 28,
      img: "img/product/1669632242611_양파.jpg",
      name: "양파",
      price: 12000,
      salePrice: 9100,
      salePct: 24,
      unit: "1망",
      weight: "3kg",
      origin: "국내산",
      category: "야채",
      content: `<p><img src="http://localhost/img/editor/1669662658204_양파.jpg" alt="img/editor/1669662658204_양파.jpg" contenteditable="false"><br></p>`,
      userID: 2
    }, {
      id: 29,
      img: "img/product/1669632247727_청경채.jpg",
      name: "청경채",
      price: 1600,
      unit: "1봉",
      weight: "150g",
      origin: "국내산",
      category: "야채",
      content: `<p><img src="http://localhost/img/editor/1669662665042_청경채.jpg" alt="img/editor/1669662665042_청경채.jpg" contenteditable="false"><br></p>`,
      userID: 2
    }, {
      id: 30,
      img: "img/product/1669632255164_황금팽이버섯.jpg",
      name: "황금팽이버섯",
      price: 1500,
      unit: "1봉",
      weight: "250g",
      origin: "국내산",
      category: "야채",
      content: `<p><img src="http://localhost/img/editor/1669662670649_황금팽이버섯.jpg" alt="img/editor/1669662670649_황금팽이버섯.jpg" contenteditable="false"><br></p>`,
      userID: 2
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('product', null, {});
  }
};
