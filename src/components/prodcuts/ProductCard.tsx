import React from 'react';
import styles from './Products.module.scss';
import Card from '../../atoms/card/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Button from '../../atoms/button/Button';

type CardProps = {
  image: string;
  title: string;
  price: string;
  rating: number;
  onClick: () => void;
};

const ProductCard: React.FC<CardProps> = ({ image, title, price, rating, onClick }) => {


  return (
    <Card>
        <div className={styles.card}>
            <img src={image} alt={title} className={styles.cardImage} />
            <div className={styles.cardContent}>
                <div>
                    <div className={styles.cardTitle}>{title}</div>
                    <div className={styles.cardPrice}>${price}</div>
                </div>
                <div className={styles.baseCard}>
                    <Button onClick={onClick}>
                        Ver
                    </Button>
                    <div className={styles.cardRating}>
                        <FontAwesomeIcon icon={faStar} />
                        {rating}
                    </div>
                </div>
            </div>
        </div>
    </Card>
  );
};

export default ProductCard;
