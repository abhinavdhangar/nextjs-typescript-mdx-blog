import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import styles from '../../styles/CardSlug.module.css';
export default function CardSlug(props) {
  return (
    <Link as={`/posts1/${props.slug}`} href={`/posts1/[slug]`}>
      <div className={styles.cards}>
        <div className={styles.card}>
          <img className={`lg:h-[325px]`} src={props.img} />
          <div className={styles.cardBody}>
            <h2>{props.title}</h2>
            <div
              className=""
              dangerouslySetInnerHTML={{ __html: `${props.description}` }}
            />

            <h5>{format(parseISO(props.date), 'MMMM dd, yyyy')}</h5>
          </div>
        </div>
      </div>
    </Link>
  );
}
