exports.TableView = function (ids, colors, hights, title, desc) {
  var view = Ti.UI.createView({
    id: ids,
    borderRadius: 12,
    elevation: 10,
    layout: "vertical",
    backgroundColor: colors,
    backgroundSelectedColor: "#cccccc",
    width: "90%",
    height: hights,
    top: "3%",
  });

  let label1 = Ti.UI.createLabel({
    id: ids,
    left: "10%",
    color: "black",
    font: {
      fontSize: 34,
      fontFamily: Alloy.Globals.font,
    },
    top: "2%",
    text: title,
  });

  let label2 = Ti.UI.createLabel({
    id: ids,
    left: "3%",
    color: "black",
    width: "94%",
    font: {
      fontSize: 17,
      fontFamily: Alloy.Globals.font,
    },
    top: "2%",
    text: desc,
  });

  view.add(label1);
  view.add(label2);

  var row = Ti.UI.createTableViewRow({
    width: "100%",
    height: Ti.UI.SIZE,
  });
  row.add(view);

  return row;
};

exports.SideTableView = function (ids, colors, titles, TotalNumber) {
  let row = Ti.UI.createTableViewRow({
    id: ids,
    backgroundColor: colors,
    width: Ti.UI.FILL,
    height: 40,
  });
  //  LEFT LABEL
  let label1 = Ti.UI.createLabel({
    left: "5%",
    color: "black",
    font: {
      fontSize: 24,
      fontFamily: Alloy.Globals.font,
    },
    text: titles,
  });
  //RIGHT LABEL
  let label2 = Ti.UI.createLabel({
    right: "10%",
    color: "black",
    font: {
      fontSize: 24,
      fontFamily: Alloy.Globals.font,
    },
    text: TotalNumber,
  });

  row.add(label1);
  row.add(label2);
  return row;
};

exports.SideTableButtonsView = function (ids, titles) {
  let row = Ti.UI.createTableViewRow({
    name: ids,
    width: "100%",
    backgroundColor: "white",
    title: titles,
    width: "100%",
    height: Ti.UI.SIZE,
    borderRadius: 5,
    color: "black",
    font: {
      fontSize: 20,
      fontFamily: Alloy.Globals.font,
    },
  });
  return row;
};
