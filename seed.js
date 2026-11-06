/* Dados reproduzidos do notebook de Análise de Dados da Tauste Roupas, cenário de setembro/2026. */
const SEED_PRODUCTS = [
  {
    "id": "PR001",
    "name": "Camiseta oversized",
    "category": "Camisetas",
    "price": 89.9,
    "initial": 80
  },
  {
    "id": "PR002",
    "name": "Camiseta polo",
    "category": "Camisetas",
    "price": 99.9,
    "initial": 64
  },
  {
    "id": "PR003",
    "name": "Camiseta regata",
    "category": "Camisetas",
    "price": 49.9,
    "initial": 48
  },
  {
    "id": "PR004",
    "name": "Calça jeans",
    "category": "Calças",
    "price": 159.9,
    "initial": 72
  },
  {
    "id": "PR005",
    "name": "Calça cargo",
    "category": "Calças",
    "price": 179.9,
    "initial": 56
  },
  {
    "id": "PR006",
    "name": "Calça de moletom",
    "category": "Calças",
    "price": 129.9,
    "initial": 40
  },
  {
    "id": "PR007",
    "name": "Calça social",
    "category": "Calças",
    "price": 199.9,
    "initial": 32
  },
  {
    "id": "PR008",
    "name": "Meia esportiva",
    "category": "Meias",
    "price": 24.9,
    "initial": 60
  },
  {
    "id": "PR009",
    "name": "Meia de cano alto",
    "category": "Meias",
    "price": 29.9,
    "initial": 44
  },
  {
    "id": "PR010",
    "name": "Meia soquete",
    "category": "Meias",
    "price": 19.9,
    "initial": 36
  }
];
const SEED_VARIANTS = [
  {
    "id": "PR001-Preta-P",
    "productId": "PR001",
    "color": "Preta",
    "size": "P",
    "initial": 8,
    "min": 1,
    "stock": 1
  },
  {
    "id": "PR001-Preta-M",
    "productId": "PR001",
    "color": "Preta",
    "size": "M",
    "initial": 14,
    "min": 2,
    "stock": 1
  },
  {
    "id": "PR001-Preta-G",
    "productId": "PR001",
    "color": "Preta",
    "size": "G",
    "initial": 14,
    "min": 2,
    "stock": 1
  },
  {
    "id": "PR001-Preta-GG",
    "productId": "PR001",
    "color": "Preta",
    "size": "GG",
    "initial": 8,
    "min": 1,
    "stock": 1
  },
  {
    "id": "PR001-Branca-P",
    "productId": "PR001",
    "color": "Branca",
    "size": "P",
    "initial": 6,
    "min": 1,
    "stock": 0
  },
  {
    "id": "PR001-Branca-M",
    "productId": "PR001",
    "color": "Branca",
    "size": "M",
    "initial": 12,
    "min": 2,
    "stock": 1
  },
  {
    "id": "PR001-Branca-G",
    "productId": "PR001",
    "color": "Branca",
    "size": "G",
    "initial": 12,
    "min": 2,
    "stock": 1
  },
  {
    "id": "PR001-Branca-GG",
    "productId": "PR001",
    "color": "Branca",
    "size": "GG",
    "initial": 6,
    "min": 1,
    "stock": 1
  },
  {
    "id": "PR002-Azul-marinho-P",
    "productId": "PR002",
    "color": "Azul-marinho",
    "size": "P",
    "initial": 5,
    "min": 1,
    "stock": 1
  },
  {
    "id": "PR002-Azul-marinho-M",
    "productId": "PR002",
    "color": "Azul-marinho",
    "size": "M",
    "initial": 10,
    "min": 1,
    "stock": 2
  },
  {
    "id": "PR002-Azul-marinho-G",
    "productId": "PR002",
    "color": "Azul-marinho",
    "size": "G",
    "initial": 10,
    "min": 1,
    "stock": 3
  },
  {
    "id": "PR002-Azul-marinho-GG",
    "productId": "PR002",
    "color": "Azul-marinho",
    "size": "GG",
    "initial": 7,
    "min": 1,
    "stock": 2
  },
  {
    "id": "PR002-Preta-P",
    "productId": "PR002",
    "color": "Preta",
    "size": "P",
    "initial": 5,
    "min": 1,
    "stock": 1
  },
  {
    "id": "PR002-Preta-M",
    "productId": "PR002",
    "color": "Preta",
    "size": "M",
    "initial": 10,
    "min": 1,
    "stock": 3
  },
  {
    "id": "PR002-Preta-G",
    "productId": "PR002",
    "color": "Preta",
    "size": "G",
    "initial": 10,
    "min": 1,
    "stock": 3
  },
  {
    "id": "PR002-Preta-GG",
    "productId": "PR002",
    "color": "Preta",
    "size": "GG",
    "initial": 7,
    "min": 1,
    "stock": 2
  },
  {
    "id": "PR003-Branca-P",
    "productId": "PR003",
    "color": "Branca",
    "size": "P",
    "initial": 4,
    "min": 1,
    "stock": 1
  },
  {
    "id": "PR003-Branca-M",
    "productId": "PR003",
    "color": "Branca",
    "size": "M",
    "initial": 8,
    "min": 1,
    "stock": 1
  },
  {
    "id": "PR003-Branca-G",
    "productId": "PR003",
    "color": "Branca",
    "size": "G",
    "initial": 8,
    "min": 1,
    "stock": 1
  },
  {
    "id": "PR003-Branca-GG",
    "productId": "PR003",
    "color": "Branca",
    "size": "GG",
    "initial": 4,
    "min": 1,
    "stock": 1
  },
  {
    "id": "PR003-Cinza-P",
    "productId": "PR003",
    "color": "Cinza",
    "size": "P",
    "initial": 4,
    "min": 1,
    "stock": 1
  },
  {
    "id": "PR003-Cinza-M",
    "productId": "PR003",
    "color": "Cinza",
    "size": "M",
    "initial": 8,
    "min": 1,
    "stock": 1
  },
  {
    "id": "PR003-Cinza-G",
    "productId": "PR003",
    "color": "Cinza",
    "size": "G",
    "initial": 8,
    "min": 1,
    "stock": 2
  },
  {
    "id": "PR003-Cinza-GG",
    "productId": "PR003",
    "color": "Cinza",
    "size": "GG",
    "initial": 4,
    "min": 1,
    "stock": 1
  },
  {
    "id": "PR004-Azul-38",
    "productId": "PR004",
    "color": "Azul",
    "size": "38",
    "initial": 7,
    "min": 1,
    "stock": 1
  },
  {
    "id": "PR004-Azul-40",
    "productId": "PR004",
    "color": "Azul",
    "size": "40",
    "initial": 13,
    "min": 2,
    "stock": 2
  },
  {
    "id": "PR004-Azul-42",
    "productId": "PR004",
    "color": "Azul",
    "size": "42",
    "initial": 13,
    "min": 2,
    "stock": 2
  },
  {
    "id": "PR004-Azul-44",
    "productId": "PR004",
    "color": "Azul",
    "size": "44",
    "initial": 8,
    "min": 1,
    "stock": 1
  },
  {
    "id": "PR004-Preta-38",
    "productId": "PR004",
    "color": "Preta",
    "size": "38",
    "initial": 5,
    "min": 1,
    "stock": 1
  },
  {
    "id": "PR004-Preta-40",
    "productId": "PR004",
    "color": "Preta",
    "size": "40",
    "initial": 10,
    "min": 1,
    "stock": 1
  },
  {
    "id": "PR004-Preta-42",
    "productId": "PR004",
    "color": "Preta",
    "size": "42",
    "initial": 10,
    "min": 1,
    "stock": 2
  },
  {
    "id": "PR004-Preta-44",
    "productId": "PR004",
    "color": "Preta",
    "size": "44",
    "initial": 6,
    "min": 1,
    "stock": 1
  },
  {
    "id": "PR005-Verde-militar-38",
    "productId": "PR005",
    "color": "Verde-militar",
    "size": "38",
    "initial": 5,
    "min": 1,
    "stock": 0
  },
  {
    "id": "PR005-Verde-militar-40",
    "productId": "PR005",
    "color": "Verde-militar",
    "size": "40",
    "initial": 10,
    "min": 1,
    "stock": 1
  },
  {
    "id": "PR005-Verde-militar-42",
    "productId": "PR005",
    "color": "Verde-militar",
    "size": "42",
    "initial": 10,
    "min": 1,
    "stock": 1
  },
  {
    "id": "PR005-Verde-militar-44",
    "productId": "PR005",
    "color": "Verde-militar",
    "size": "44",
    "initial": 6,
    "min": 1,
    "stock": 0
  },
  {
    "id": "PR005-Bege-38",
    "productId": "PR005",
    "color": "Bege",
    "size": "38",
    "initial": 4,
    "min": 1,
    "stock": 0
  },
  {
    "id": "PR005-Bege-40",
    "productId": "PR005",
    "color": "Bege",
    "size": "40",
    "initial": 8,
    "min": 1,
    "stock": 1
  },
  {
    "id": "PR005-Bege-42",
    "productId": "PR005",
    "color": "Bege",
    "size": "42",
    "initial": 8,
    "min": 1,
    "stock": 1
  },
  {
    "id": "PR005-Bege-44",
    "productId": "PR005",
    "color": "Bege",
    "size": "44",
    "initial": 5,
    "min": 1,
    "stock": 0
  },
  {
    "id": "PR006-Cinza-38",
    "productId": "PR006",
    "color": "Cinza",
    "size": "38",
    "initial": 3,
    "min": 1,
    "stock": 1
  },
  {
    "id": "PR006-Cinza-40",
    "productId": "PR006",
    "color": "Cinza",
    "size": "40",
    "initial": 6,
    "min": 1,
    "stock": 2
  },
  {
    "id": "PR006-Cinza-42",
    "productId": "PR006",
    "color": "Cinza",
    "size": "42",
    "initial": 6,
    "min": 1,
    "stock": 3
  },
  {
    "id": "PR006-Cinza-44",
    "productId": "PR006",
    "color": "Cinza",
    "size": "44",
    "initial": 5,
    "min": 1,
    "stock": 3
  },
  {
    "id": "PR006-Preta-38",
    "productId": "PR006",
    "color": "Preta",
    "size": "38",
    "initial": 3,
    "min": 1,
    "stock": 0
  },
  {
    "id": "PR006-Preta-40",
    "productId": "PR006",
    "color": "Preta",
    "size": "40",
    "initial": 6,
    "min": 1,
    "stock": 3
  },
  {
    "id": "PR006-Preta-42",
    "productId": "PR006",
    "color": "Preta",
    "size": "42",
    "initial": 6,
    "min": 1,
    "stock": 3
  },
  {
    "id": "PR006-Preta-44",
    "productId": "PR006",
    "color": "Preta",
    "size": "44",
    "initial": 5,
    "min": 1,
    "stock": 2
  },
  {
    "id": "PR007-Preta-38",
    "productId": "PR007",
    "color": "Preta",
    "size": "38",
    "initial": 3,
    "min": 1,
    "stock": 0
  },
  {
    "id": "PR007-Preta-40",
    "productId": "PR007",
    "color": "Preta",
    "size": "40",
    "initial": 5,
    "min": 1,
    "stock": 2
  },
  {
    "id": "PR007-Preta-42",
    "productId": "PR007",
    "color": "Preta",
    "size": "42",
    "initial": 5,
    "min": 1,
    "stock": 2
  },
  {
    "id": "PR007-Preta-44",
    "productId": "PR007",
    "color": "Preta",
    "size": "44",
    "initial": 4,
    "min": 1,
    "stock": 1
  },
  {
    "id": "PR007-Azul-marinho-38",
    "productId": "PR007",
    "color": "Azul-marinho",
    "size": "38",
    "initial": 2,
    "min": 1,
    "stock": 1
  },
  {
    "id": "PR007-Azul-marinho-40",
    "productId": "PR007",
    "color": "Azul-marinho",
    "size": "40",
    "initial": 5,
    "min": 1,
    "stock": 2
  },
  {
    "id": "PR007-Azul-marinho-42",
    "productId": "PR007",
    "color": "Azul-marinho",
    "size": "42",
    "initial": 5,
    "min": 1,
    "stock": 2
  },
  {
    "id": "PR007-Azul-marinho-44",
    "productId": "PR007",
    "color": "Azul-marinho",
    "size": "44",
    "initial": 3,
    "min": 1,
    "stock": 1
  },
  {
    "id": "PR008-Branca-34-38",
    "productId": "PR008",
    "color": "Branca",
    "size": "34-38",
    "initial": 13,
    "min": 2,
    "stock": 3
  },
  {
    "id": "PR008-Branca-39-43",
    "productId": "PR008",
    "color": "Branca",
    "size": "39-43",
    "initial": 18,
    "min": 2,
    "stock": 4
  },
  {
    "id": "PR008-Preta-34-38",
    "productId": "PR008",
    "color": "Preta",
    "size": "34-38",
    "initial": 12,
    "min": 2,
    "stock": 3
  },
  {
    "id": "PR008-Preta-39-43",
    "productId": "PR008",
    "color": "Preta",
    "size": "39-43",
    "initial": 17,
    "min": 2,
    "stock": 3
  },
  {
    "id": "PR009-Branca-34-38",
    "productId": "PR009",
    "color": "Branca",
    "size": "34-38",
    "initial": 10,
    "min": 1,
    "stock": 0
  },
  {
    "id": "PR009-Branca-39-43",
    "productId": "PR009",
    "color": "Branca",
    "size": "39-43",
    "initial": 13,
    "min": 2,
    "stock": 0
  },
  {
    "id": "PR009-Cinza-34-38",
    "productId": "PR009",
    "color": "Cinza",
    "size": "34-38",
    "initial": 9,
    "min": 1,
    "stock": 0
  },
  {
    "id": "PR009-Cinza-39-43",
    "productId": "PR009",
    "color": "Cinza",
    "size": "39-43",
    "initial": 12,
    "min": 2,
    "stock": 0
  },
  {
    "id": "PR010-Preta-34-38",
    "productId": "PR010",
    "color": "Preta",
    "size": "34-38",
    "initial": 9,
    "min": 1,
    "stock": 2
  },
  {
    "id": "PR010-Preta-39-43",
    "productId": "PR010",
    "color": "Preta",
    "size": "39-43",
    "initial": 10,
    "min": 1,
    "stock": 2
  },
  {
    "id": "PR010-Branca-34-38",
    "productId": "PR010",
    "color": "Branca",
    "size": "34-38",
    "initial": 8,
    "min": 1,
    "stock": 2
  },
  {
    "id": "PR010-Branca-39-43",
    "productId": "PR010",
    "color": "Branca",
    "size": "39-43",
    "initial": 9,
    "min": 1,
    "stock": 2
  }
];
