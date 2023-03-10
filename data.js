const data = {
  nodes: [
    { name: "Pozo 1", type: "well" },
    { name: "Pozo 2", type: "well" },
    { name: "Pozo 3", type: "well" },
    { name: "Pozo 4", type: "well" },
    { name: "Tanque Ppal", type: "tank" },
    { name: "A oficinas, trainig center, vigilancia", type: "coso" },
    { name: "API", type: "coso" },
    { name: "Torre de enfriamiento", type: "cooling_tower" },
    { name: "Calderas", type: "boiler" },
    { name: "Sec.Arsenico", type: "coso" },
    { name: "Osmosis", type: "coso" },
    { name: "Primario", type: "plant" },
    { name: "Secundario", type: "plant" },
    { name: "Depositos", type: "store" },
    { name: "Baños/Comedor", type: "bathroom" },
    { name: "Perdidas", type: "coso" },
    { name: "Agua en prodcuto", type: "coso" },
    { name: "Consumo humano", type: "coso" },
    { name: "PTEL", type: "coso" },
    { name: "Arroyo", type: "body of water" },
    { name: "Desaireador", type: "coso" },
    { name: "Tanque de almacenamiento", type: "tank" },
    { name: "TK diario 16 m3", type: "tank" },
    { name: "TKs Calderas 2 (4 m3)", type: "tank" },
    { name: "Tanque Potable 20 m3", type: "tank" },
    { name: "Colector Industrial", type: "collector"},
    { name: "Colector cloacal", type: "collector"}, 
    { name: "Condensado", type: "coso"}
  ],
  links: [
    {
      source: "Pozo 1",
      target: "Tanque Ppal",
      value: 39071.27,
      type: "industrial",
    },
    {
      source: "Pozo 2",
      target: "Tanque Ppal",
      value: 14299.4,
      type: "industrial",
    },
    {
      source: "Pozo 3",
      target: "Tanque Ppal",
      value: 31953.93,
      type: "industrial",
    },
    {
      source: "Pozo 4",
      target: "A oficinas, trainig center, vigilancia",
      value: 31953.93,
      type: "industrial",
    },
    {
      source: "Tanque Ppal",
      target: "API",
      value: 1647.96,
      type: "industrial",
    },
    {
      source: "Tanque Ppal",
      target: "Torre de enfriamiento",
      value: 22993.04,
      type: "industrial",
    },
    {
      source: "Torre de enfriamiento",
      target: "Calderas",
      value: 2240.9,
      type: "industrial",
    },
    {
      source: "Tanque Ppal",
      target: "Sec.Arsenico",
      value: 5851.46,
      type: "industrial",
    },
    {
      source: "Tanque Ppal",
      target: "Osmosis",
      value: 36434.3,
      type: "industrial",
    },
    {
      source: "Tanque Ppal",
      target: "Primario",
      value: 718.39,
      type: "industrial",
    },
    {
      source: "Tanque Ppal",
      target: "Secundario",
      value: 266.5,
      type: "industrial",
    },
    {
      source: "Tanque Ppal",
      target: "Depositos",
      value: 1325,
      type: "industrial",
    },
    {
      source: "Tanque Ppal",
      target: "Baños/Comedor",
      value: 0,
      type: "industrial",
    },
    {
      source: "Primario",
      target: "Perdidas",
      value: 1918.62,
      type: "steam",
    },
    {
      source: "Primario",
      target: "Agua en prodcuto",
      value: 1493.34,
      type: "industrial",
    },
    {
      source: "PTEL",
      target: "Arroyo",
      value: 20075,
      type: "potable",
    },
    {
      source: "Colector cloacal",
      target: "PTEL", 
      value: 10658.55,
      type: "drain"
    },
    {
      source: "Tanque Potable 20 m3", 
      target: "Primario",
      value: 6647.43,
      type: "potable"
    }, 
    {
      source: "Tanque Potable 20 m3", 
      target: "Secundario",
      value: 1589.50,
      type: "potable"
    }, 
    {
      source: "Tanque Potable 20 m3", 
      target: "Depositos",
      value: 0,
      type: "potable"
    }, 
    {
      source: "Tanque Potable 20 m3", 
      target: "Baños/Comedor",
      value: 10529.43,
      type: "potable"
    }, 
    {
      source: "Osmosis", 
      target: "Tanque Potable 20 m3", 
      value: 21170.7, 
      type: "potable"
    }, 
    {
      source: "Osmosis", 
      target: "Arroyo", 
      value: 10930.29, 
      type: "industrial"
    }, 
    {
      source: "Osmosis", 
      target: "TKs Calderas 2 (4 m3)",
      value: 10184.78, 
      type: "industrial"
    }, 
    {
      source: "TK diario 16 m3",
      target: "Desaireador",
      value: 10185, 
      type: "potable"
    }, 
    {
      source: "TKs Calderas 2 (4 m3)",
      target: "TK diario 16 m3",
      value: 0, 
      type: "potable"
    },
    {
      source: "Condensado", 
      target: "TK diario 16 m3",
      value: 2098.4,
      type: "potable"
    }, 
    {
      source: "Sec.Arsenico",
      target: "Tanque Potable 20 m3",
      value: 31355.5,
      type: "industrial"
    }, 
    {
      source: "Desaireador",
      target: "Calderas",
      value: 10185,
      type: "potable"
    }, 
    {
      source: "Calderas", 
      target: "Desaireador", 
      value: 305, 
      type: "steam"
    }, 
    {
      source: "Calderas",
      target: "Perdidas",
      value: 10180,
      type: "steam"
    }, 
  ],
};
