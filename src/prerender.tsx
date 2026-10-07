import { renderToString } from 'react-dom/server';
import App from './App';
export function render(page:'home'|'about'){return renderToString(<App page={page}/>);}
