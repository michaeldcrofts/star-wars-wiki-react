import './Loading.css';

export const Loading = (props: {message: string}) => (
    <div className="loader">
        <div data-testid="loading-animation" className="loading-animation"></div>
        <p>{props.message}</p>
    </div>

);
