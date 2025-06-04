import SearchCheckbox from "./ParkCheckbox";
import RideTypeCheckbox from "./RideTypeCheckbox";
import "../style/NewSearch.css";
import { useState } from "react";
export default function NewSearch({
  waitTimes,
  addParkToView,
  removeParkFromView,
  removeAttributeFilter,
  addAttributeFilter,
  allAttributes
}) {
  const [attributes, setAllAttributes] = useState(allAttributes)

  /**
   * 1. Needs to collapse to the left of screen whenever the screen size gets
   *    to maybe 900px.
   * 2.
   */
  return (
    <section className="w-25 p-2">
      <h3 className="text-center">Find your rides!</h3>
      <div className="accordion accordion-flush" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Park
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <form action="">
                {waitTimes.map((park, i) => {
                  return (
                    <SearchCheckbox
                      key={i}
                      park={park}
                      addParkToView={addParkToView}
                      removeParkFromView={removeParkFromView}
                    />
                  );
                })}
              </form>
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Ride Types
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              {attributes.map((attribute, i) => {
                return (
                  <RideTypeCheckbox
                    key={i}
                    attribute={attribute}
                    removeAttributeFilter={removeAttributeFilter}
                    addAttributeFilter={addAttributeFilter}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Accordion Item #3
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <strong>This is the third item’s accordion body.</strong> It is
              hidden by default, until the collapse plugin adds the appropriate
              classNamees that we use to style each element. These classNamees
              control the overall appearance, as well as the showing and hiding
              via CSS transitions. You can modify any of this with custom CSS or
              overriding our default variables. It’s also worth noting that just
              about any HTML can go within the <code>.accordion-body</code>,
              though the transition does limit overflow.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
