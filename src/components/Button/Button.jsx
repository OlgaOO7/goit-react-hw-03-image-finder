import css from "./Button.module.css";

export const Button = ({onClick}) => {
  return (
    <button className={css.loadMoreBtn} type="button" onClick={onClick}>Load more</button>
  )
}