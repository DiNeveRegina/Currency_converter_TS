import {Spinner} from "react-bootstrap";

const setContent = (status: string, Component: React.FC) => {
    switch (status){
        case "loading": 
            return (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )

        case "idle":
            return <Component />;

        case "error":
            return <h2>error</h2>;
            
        default:
            throw new Error("Unexpected status state");
    }
}

export default setContent;