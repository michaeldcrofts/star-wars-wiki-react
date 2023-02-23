import React, { ReactNode } from "react";
import { Card, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import './SummaryCard.css';
import { Character } from "../../utils/interfaces";
import { FavouriteIcon } from "../Favourite/Favourite";


export interface headingValue {
    heading: string | number | ReactNode;
    value: string | number | undefined | ReactNode;
}

const SummaryCard = (props: { title: string | undefined, data: headingValue[], url: string, 
    favourite?: {character: Character | Partial<Character>} }) => {
    const rows: ReactNode[] = [];
    for (let i = 0; i < props.data.length; i++) {
        rows.push(
            <Row key={i}>
                {props.data[i].heading}: {props.data[i].value}
            </Row>
        );
    }

    return (
        <Card className="my-3 link-card" bg="secondary">
            {(props.favourite) ? (
                <React.Fragment>
                    <Card.Header>
                        <Card.Title>{props.title}<FavouriteIcon character={props.favourite.character}/></Card.Title>
                    </Card.Header>
                    <Link to={props.url}>
                        <Card.Body>
                            {rows}
                        </Card.Body>
                    </Link>
                </React.Fragment>
            ) : (
                <Link to={props.url}>
                    <Card.Header>
                        <Card.Title>{props.title}</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        {rows}
                    </Card.Body>
                </Link>
            )}
        </Card>
    );
  }
  
  export default SummaryCard;