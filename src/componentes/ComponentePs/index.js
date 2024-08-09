import Card1 from "../Cards/Card1"

function ComponentePs({ visibilidade }) {
    return (
        <div className={`block justify-center mt-36 space-x-16 ${visibilidade ? "flex" : "hidden"}`}>
            <Card1 />
        </div>
    );
}

export default ComponentePs