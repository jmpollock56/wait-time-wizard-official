import SearchCheckbox from "./SearchCheckbox"
export default function NewSearch({ waitTimes, addParkToView, removeParkFromView }){

  
  return (
    <section>
      <form action=''>
        {waitTimes.map((park, i) => {
          return (
            <SearchCheckbox park={park} addParkToView={addParkToView} removeParkFromView={removeParkFromView}/>
          )
        })}
      </form>
    </section>
  )
}