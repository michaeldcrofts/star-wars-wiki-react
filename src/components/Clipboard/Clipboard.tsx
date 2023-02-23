import React, { ReactNode } from 'react';
import { Col, Row, Card } from 'react-bootstrap';
import { Character } from '../../utils/interfaces';

import { FavouriteIcon } from '../Favourite/Favourite';

import './Clipboard.css';

export interface headingValue {
    heading: string | number | ReactNode;
    value: string | number | undefined | ReactNode;
}
export const Clipboard = (props: { title: string | undefined, data: headingValue[], columns: number, 
  favourite?: {character: Character | Partial<Character>} }) => {
    const rows: ReactNode[] = [];
    for (let i = 0; i < props.data.length; i += props.columns) {
        const cols: ReactNode[] = [];
        for (let colCount=0; colCount < props.columns; colCount++) {
            const col = (
                <React.Fragment key={`${i}-${colCount}`}>
                  <Col xs={6} md={3} className="category withBorder">{props.data[i + colCount].heading}</Col>
                  <Col xs={6} md={3} className="value withBorder">{props.data[i + colCount].value}</Col>
                </React.Fragment>
            );
            cols.push(col);
        }
        const row: ReactNode = (
            <Row key={i}>
                {cols}
            </Row>
        );
        rows.push(row);
    }
    return (
      <Card className="clipboard-card">
        <Card.Header>
          <Card.Title style={{ display: 'inline-block' }}>{props.title}
            {(props.favourite) ? (
              <FavouriteIcon character={props.favourite.character}/>
            ) : (<></>) }         
          </Card.Title>
        </Card.Header>
        <Card.Body>
          {rows}
        </Card.Body>
      </Card>
    );
  }
  
