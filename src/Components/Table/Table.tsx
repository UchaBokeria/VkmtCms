import "./Table.scss";
import { Component } from "react";
import { Loading } from "../Loading/Loading";

export default class Table extends Component <any, any, any> {
  constructor(props: any ) {
    super(props);
    this.state = {
      modalItem: null,
      selected: [],
      dbClick: props.config?.dbClick || ((e:any=null)=> {}),
      loading: false,
      selectAll: false,
      modalOpened: false,
      newItemModal: false,
      identifer: props.config?.identifer || 'id',
      static: props.config.static,
      route: props.config.route,
      modal: props.config.modal,
      requests: props.config.request,
      columnNames: props.config.columns,
      staticData: props.config.data,
      dataBound: null,
      originalBound: null,
      filters: [],
      search:   props.config.search === false ? 
                props.config.search : true,
      buttons:  props.config.buttons == undefined || 
                props.config.buttons == null ? 
                true : props.config.buttons
    };
  }

  componentDidMount = async () => await this.runRequest();

  componentWillReceiveProps = async (nextProps) => {
    this.setState({ dataBound: nextProps.config.data, originalBound: nextProps.config.data, loading: false });
  };
  
  runRequest = async () => {
    this.setState({ selected: [], selectAll: false, loading: true });
    var iceData = (
      this.state.static
        ? this.state.staticData
        : await this.state.requests?.Read()
    ).map((el:any) => {
      return { ...el, react_checked: false };
    });

    this.setState({ dataBound: iceData, originalBound: iceData, loading: false });
    return iceData;
  };

  selectAll = () => {
    this.setState({
      selectAll: !this.state.selectAll,
      dataBound: this.state.dataBound.map((e) => {
        return { ...e, react_checked: !this.state.selectAll };
      }),
      selected: this.state.selectAll
        ? []
        : this.state.dataBound.map((el) => {
            return el[this.state.identifer];
          }),
    });
  };

  select = (i) => {
    this.setState({
      dataBound: this.state.dataBound.map((el, ind) => {
        if (ind != i) return el;
        else {
          if (!el["react_checked"] && !this.state.selected.includes(el[this.state.identifer])) {
            this.state.selected.push(el[this.state.identifer]);
            this.setState({ selected: this.state.selected });
          } else if (
            el["react_checked"] &&
            this.state.selected.includes(el[this.state.identifer])
          ) {
            this.state.selected.splice(this.state.selected.indexOf(el[this.state.identifer]), 1);
            this.setState({ selected: this.state.selected });
          }
          return { ...el, react_checked: !el["react_checked"] };
        }
      }),
    });
  };

  create = async () => {
    this.setState({ selected: [], selectAll: false, loading: true });
    this.state.static
      ? this.state.dataBound.push(this.state.modalItem)
      : await this.state.requests.Create(this.state.modalItem) && 
        await this.runRequest();
    this.setState({ modalItem: null, loading: false });
  };

  update = async () => {
    this.setState({ selected: [], selectAll: false, loading: true });
    this.state.static
      ? (this.setState({dataBound: this.state.dataBound.map((el:any) => {
          if (el[this.state.identifer] === this.state.modalItem[this.state.identifer]) return this.state.modalItem;
          return el;
        })}))
      : (await this.state.requests.Update(
          this.state.modalItem[this.state.identifer],
          this.state.modalItem
        )) && await this.runRequest();
    this.setState({ modalItem: null, loading: false });
  };

  delete = async () => {
    this.setState({ selected: [], selectAll: false, loading: true });
    await this.state.requests.Delete(this.state.selected);
    await this.runRequest()
  };

  filter = (col, event) => {
    this.setState({ selected: [], selectAll: false });
    var index = this.state.filters.findIndex((e) => {
      return e.col == col;
    }); // index in filters arr
    var target = event.target; // element
    var key = event.key; // to detect backspace

    if (target.value != null && target.value != "") {
      if (index == -1) {
        this.state.filters.push({ col: col, value: target.value });
        this.setState({ filters: this.state.filters });
      } else {
        this.state.filters[index].value = target.value;
        this.setState({ filters: this.state.filters });
      }

      this.state.filters.forEach((f, ig) => {
        this.setState({
          dataBound: (ig > 0
            ? this.state.dataBound
            : this.state.originalBound
          ).filter((e) => {
            if (typeof e[f.col] == "boolean") {
              if (f.value != "yes" && f.value != "no") return f.value != "yes";
              return e[f.col] == (f.value == "yes");
            } else if (typeof e[f.col] != "boolean") {
              return e[f.col].includes(f.value);
            }
          }),
        });
      });
    } else if (
      (key === "Backspace" || key === "Delete") &&
      target.value == ""
    ) {
      this.state.filters.splice(index, 1);
      this.setState({ filters: this.state.filters });

      if (this.state.filters.length > 0) {
        this.state.filters.forEach((f, ig) => {
          this.setState({
            dataBound: (ig > 0
              ? this.state.dataBound
              : this.state.originalBound
            ).filter((e) => {
              if (typeof e[f.col] == "boolean") {
                if (f.value != "yes" && f.value != "no")
                  return f.value != "yes";
                return e[f.col] == (f.value == "yes");
              } else if (typeof e[f.col] != "boolean") {
                return e[f.col].includes(f.value);
              }
            }),
          });
        });
      } else {
        this.setState({ dataBound: this.state.originalBound });
      }
    }
  };

  buildModal = () => {
    return (
      <>
        <div className="dark-bg"></div>
        <div className="Modal">
          <div className="ModalContent">
            <div
              className="ModalHeader"
              key={"react_header_" + JSON.stringify(new Date())}
            >
              {" "}
              {this.state.modal.header?.identifier &&
                this.state.modalItem[this.state.modal.header?.identifier] && (
                  <h2>
                    Record:{" "}
                    {this.state.modalItem[this.state.modal.header?.identifier]}
                  </h2>
                )}
              <button
                className="close-btn"
                onClick={() =>
                  this.setState({ modalOpened: false, modalItem: null })
                }
              >
                <i className="material-icons-outlined">close</i>
              </button>
            </div>

            <div className="ModalBody">
              {/* PRE-CONTENT */}
              {this.state.modal?.preContent && this.state.modal?.preContent(this.state.modalItem)}

              {/* SECTIONS */}
              {this.state.modal?.sections.map((field, i) => {
                if (!field.hasOwnProperty("editable")) field.editable = true;
                if (field.type == "select" && !field.hasOwnProperty("options"))
                  console.error("error build select without options");

                return field.content ? (
                  field.content()
                ) : (
                  <div key={"modalField" + i} className="ModalField">
                    {" "}
                    <div className="field-title">{field.name}</div>
                    {(() => {
                      switch (field.type) {
                        case "checkbox":
                          return (
                            <input
                              type="checkbox"
                              key={field.key}
                              defaultChecked={this.state.modalItem[field.key]}
                              disabled={
                                !field.editable || !this.state.modal.editable
                              }
                              onChange={(e) =>
                                this.setState({
                                  modalItem: {
                                    ...this.state.modalItem,
                                    [field.key]: e.target.checked,
                                  },
                                })
                              }
                            />
                          );
                        case "text":
                          return (
                            <input
                              type="text"
                              name={field.key}
                              defaultValue={this.state.modalItem[field.key]}
                              disabled={
                                !field.editable || !this.state.modal.editable
                              }
                              onKeyUp={(e:any) =>
                                this.setState({
                                  modalItem: {
                                    ...this.state.modalItem,
                                    [field.key]: e.target?.value,
                                  },
                                })
                              }
                            />
                          );
                        case "number":
                          return (
                            <input
                              type="number"
                              name={field.key}
                              defaultValue={this.state.modalItem[field.key]}
                              disabled={
                                !field.editable || !this.state.modal.editable
                              }
                              onKeyUp={(e:any) =>
                                this.setState({
                                  modalItem: {
                                    ...this.state.modalItem,
                                    [field.key]: e.target?.value,
                                  },
                                })
                              }
                            />
                          );
                        case "date":
                          return (
                            <input
                              type="date"
                              name={field.key}
                              defaultValue={this.state.modalItem[field.key]}
                              disabled={
                                !field.editable || !this.state.modal.editable
                              }
                              onChange={(e) =>
                                this.setState({
                                  modalItem: {
                                    ...this.state.modalItem,
                                    [field.key]: e.target.value,
                                  },
                                })
                              }
                            />
                          );
                        case "select":
                          return (
                            <select
                              name={field.key}
                              value={this.state.modalItem[field.key]}
                              disabled={
                                !field.editable || !this.state.modal.editable
                              }
                              onChange={(e) =>
                                this.setState({
                                  modalItem: {
                                    ...this.state.modalItem,
                                    [field.key]: e.target.value,
                                  },
                                })
                              }
                            >
                              <option
                                key="modal-opt_0"
                                defaultValue={""}
                              ></option>
                              {field.options.map((option, i) => {
                                if(typeof option != 'object') {
                                  return (
                                    <option key={"modal-opt_" + (i + 1)} value={option}>
                                      {option}
                                    </option>
                                  );
                                } else {
                                  return (
                                    <option key={"modal-opt_" + (i + 1)} value={option.value}>
                                      {option.name}
                                    </option>
                                  );
                                }
                              })}
                            </select>
                          );
                        default:
                          return (
                            <input
                              type="text"
                              name={field.key}
                              defaultValue={this.state.modalItem[field.key]}
                              disabled={
                                !field.editable || !this.state.modal.editable
                              }
                              onKeyUp={(e:any) =>
                                this.setState({
                                  modalItem: {
                                    ...this.state.modalItem,
                                    [field.key]: e.target?.value,
                                  },
                                })
                              }
                            />
                          );
                      }
                    })()}
                  </div>
                );
              })}
              
              {/* POST-CONTENT */}
              {this.state.modal?.postContent && this.state.modal?.postContent(this.state.modalItem)}
            </div>
            <div className="ModalFooter">
              <button className="close"
                onClick={() =>
                  this.setState({ modalOpened: false, modalItem: null })
                }
              >
                Close
              </button>
              <button
                onClick={() => {
                  this.setState({ modalOpened: false });
                  this.state.newItemModal ? this.create() : this.update();
                }}
              >
                {this.state.newItemModal ? "Create" : "Update"}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  render() {
    return (
      <>
        {this.state.buttons && <div className="Tools">
          <button className="select-all" onClick={this.selectAll}>
            <i className="material-icons">
              {this.state.selectAll
                ? "check_box_outline"
                : "check_box_outline_blank"}
            </i>
          </button>

          <button
            className="create"
            onClick={() =>
              this.setState({
                newItemModal: true,
                modalOpened: true,
                modalItem: Object.assign(this.state.columnNames.map((key: any) => { return { [key?.name]: "" } })),
              }) }>
            <i className="material-icons">save</i> Create
          </button>

          <button className="delete" onClick={this.delete}>
            <i className="material-icons">delete</i> Delete
          </button>
        </div>}

        {this.state.loading && <Loading type="spinningBubbles" />}

        {this.state.dataBound && (
          <table className="Table">
            <thead className="TableHeader">
              <tr className="TableHeaderRow">
                {this.state.columnNames.map((col, i) => {
                  if (!col.hidden)
                    return (
                      <td key={i} className="th" col-name={col.name}>
                        {col.title}
                      </td>
                    );
                })}
              </tr>
              {this.state.search && <tr className="TableHeaderSearch">
                {this.state.columnNames.map((col, i) => {
                  if (!col.hidden)
                    return (
                      <td key={i} className="th" col-name={col.name}>
                        <input
                          type="text"
                          onKeyUp={(e) => this.filter(col.name, e)}
                          placeholder={col.title}
                        />
                      </td>
                    );
                })}
              </tr>}
            </thead>

            <tbody className="TableBody">
              {this.state.dataBound.map((data:any, i:any) => {
                return (
                  <tr
                    key={i}
                    className={
                      this.state.dataBound[i].react_checked
                        ? "tr selected"
                        : "tr"
                    }
                    onClick={() => this.select(i)}
                    onDoubleClick={() => {
                      this.state?.dbClick(data);
                      this.setState({
                        newItemModal: false,
                        modalOpened: true,
                        modalItem: data,
                      })
                    }}
                  >
                    {this.state.columnNames.map((item, i) => {
                      return item.hidden ? (
                        ""
                      ) : (
                        <td
                          key={data[this.state.identifer] + i}
                          className="td"
                          col-config={JSON.stringify(data)}
                          col-value={data[item.name]?.toString()}
                          col-title={data[item.title]}
                          col-name={item.name}
                          title={
                            typeof data[item.name] == "boolean"
                              ? data[item.name]
                                ? "yes"
                                : "no"
                              : data[item.name]
                          }
                        >
                          {item.hasOwnProperty("template")
                            ? item.template(data)
                            : data[item.name]}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {this.state.modal && this.state.modalOpened && this.buildModal()}
      </>
    );
  }
}
