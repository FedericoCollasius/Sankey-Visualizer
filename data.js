const loadSample = () => {
  if (
    !confirm(
      "¿Seguro que desea cargar el ejemplo? Se perderán los datos actuales"
    )
  ) {
    return;
  }

  const nodes = [
    [1, "Pozo 1", "#4975ff"],
    [2, "Pozo 2", "#4975ff"],
    [3, "Pozo 3", "#4975ff"],
    [4, "Pozo 4", "#4975ff"],
    [5, "Tanque Ppal", "#002fc3"],
    [6, "A oficinas, trainig center, vigilancia", "#ff00ff"],
    [7, "API", "#ff00ff"],
    [8, "Torre de enfriamiento", "#ff00ff"],
    [9, "Calderas", "#ff00ff"],
    [10, "Sec.Arsenico", "#ff00ff"],
    [11, "Osmosis", "#ff00ff"],
    [12, "Primario", "#ff00ff"],
    [13, "Secundario", "#ff00ff"],
    [14, "Depositos", "#ff00ff"],
    [15, "Baños/Comedor", "#ff00ff"],
    [16, "Perdidas", "#ff00ff"],
    [17, "Agua en prodcuto", "#ff00ff"],
    [18, "Consumo humano", "#ff00ff"],
    [19, "PTEL", "#ff00ff"],
    [20, "Arroyo", "#ff00ff"],
    [21, "Desaireador", "#ff00ff"],
    [22, "Tanque de almacenamiento", "#002fc3"],
    [23, "TK diario 16 m3", "#002fc3"],
    [24, "TKs Calderas 2 (4 m3)", "#002fc3"],
    [25, "Tanque Potable 20 m3", "#002fc3"],
    [26, "Colector Industrial", "#ff00ff"],
    [27, "Colector cloacal", "#ff00ff"],
    [28, "Condensado", "#ff00ff"],
  ];
  const linkTypes = [
    [1, "Vapor", "red"],
    [2, "Industrial", "cyan"],
    [3, "Potable", "green"],
    [4, "Drenaje", "yellow"],
  ];
  const links = [
    [1, 5, 2, 39071.27, "m3/año"],
    [2, 5, 2, 14299.4, "m3/año"],
    [3, 5, 2, 31953.93, "m3/año"],
    [4, 6, 2, 31953.93, "m3/año"],
    [5, 7, 2, 1647.96, "m3/año"],
    [5, 8, 2, 22993.04, "m3/año"],
    [8, 9, 2, 2240.9, "m3/año"],
    [5, 10, 2, 5851.46, "m3/año"],
    [5, 11, 2, 36434.3, "m3/año"],
    [5, 12, 2, 718.39, "m3/año"],
    [5, 13, 2, 266.5, "m3/año"],
    [5, 14, 2, 1325, "m3/año"],
    [5, 15, 2, 0, "m3/año"],
    [12, 16, 1, 1918.62, "m3/año"],
    [12, 17, 2, 1493.34, "m3/año"],
    [19, 20, 3, 20075, "m3/año"],
    [27, 19, 4, 10658.55, "m3/año"],
    [25, 12, 3, 6647.43, "m3/año"],
    [25, 13, 3, 1589.5, "m3/año"],
    [25, 14, 3, 0, "m3/año"],
    [25, 15, 3, 10529.43, "m3/año"],
    [11, 25, 3, 21170.7, "m3/año"],
    [11, 20, 2, 10930.29, "m3/año"],
    [11, 24, 2, 10184.78, "m3/año"],
    [23, 21, 3, 10185, "m3/año"],
    [24, 23, 3, 0, "m3/año"],
    [28, 23, 3, 2098.4, "m3/año"],
    [10, 25, 2, 31355.5, "m3/año"],
    [21, 9, 3, 10185, "m3/año"],
    [9, 21, 1, 305, "m3/año"],
    [9, 16, 1, 10180, "m3/año"],
  ];

  nodesTable.setData(nodes);
  linksTypeTable.setData(linkTypes);
  linksTable.setData(links);

  updateTableDropdowns();
  makeSankey();
};

const saveToLocalStorage = () => {
  if (nodesTable && linksTypeTable && linksTable) {
    localStorage.setItem("nodes", JSON.stringify(nodesTable.getData()));
    localStorage.setItem("linkTypes", JSON.stringify(linksTypeTable.getData()));
    localStorage.setItem("links", JSON.stringify(linksTable.getData()));
  }
};

const loadInitials = () => {
  let nodes = [[1, "Nodo", "red"]];
  let linkTypes = [[1, "Enlace", "red"]];
  let links = [[]];

  if (localStorage.getItem("nodes") !== null)
    nodes = JSON.parse(localStorage.getItem("nodes"));
  if (localStorage.getItem("linkTypes") !== null)
    linkTypes = JSON.parse(localStorage.getItem("linkTypes"));
  if (localStorage.getItem("links") !== null)
    links = JSON.parse(localStorage.getItem("links"));

  return { nodes, linkTypes, links };
};
