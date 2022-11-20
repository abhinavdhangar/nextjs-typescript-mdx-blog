import styles from '../styles/Stepper.module.scss';

export default function Index(props) {
  let {content,isLink} = props


    return (
    <div className="my-4">
      {content.map(single=>(
        <div className={styles.boStepActive}>
          <div>
            { single.url ?(<a href={single.url}>{single.title}</a>):(single.title)}
          </div>
          </div>
      ))}
    
    </div>
  );
}
