import classes from './ErrorMessage.module.css';

function ErrorMessage() {
  return (
    <div className={classes['error-message-container']}>
      <p className={classes['error-message']}>Something went wrong</p>
    </div>
  );
}

export default ErrorMessage;
