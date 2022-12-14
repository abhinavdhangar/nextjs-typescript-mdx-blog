import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import styles from '../../styles/CardSlug.module.css';
export default function CardSlug(props) {
  return (
    <Link as={`/posts1/${props.slug}`} href={`/posts1/[slug]`}>
      <div className={styles.cards}>
        <div className={`${styles.card} dark:bg-slate-900 ` }>
{props.img ?  (<img className={`lg:h-[325px]`} alt={props.title} src={props.img} />):(<img alt={props.title} className={`lg:h-[325px]`} src={"https://picsum.photos/500/350"}/>)}       
   <div className={styles.cardBody}>
            <h2 className={` dark:text-white  text-black  ` + styles.heding}>{props.title}</h2>
            <div
              className={`dark:text-white text-black`}
              dangerouslySetInnerHTML={{ __html: `${props.description}` }}
            />

            <h5>{props.date&& format(parseISO(props.date), 'MMMM dd, yyyy')}</h5>
          </div>
        </div>
      </div>
    </Link>
  );
}
