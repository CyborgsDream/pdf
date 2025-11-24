import ThreeApp from './three-scene.js';
import { setupUI } from './ui.js';

const canvas = document.getElementById('three-canvas');
const svg = document.getElementById('svg-overlay');

const app = new ThreeApp({ canvas, svg });

document.getElementById('resetBtn').addEventListener('click', ()=>{
  app.controls.reset();
});

// wire prompt and tool buttons
setupUI({
  onSubmit: (text)=>{
    // basic example: set HUD text and log
    const hud = document.getElementById('hud-text');
    if(hud) hud.textContent = text;
    console.log('Prompt submitted:', text);
  },
  onTool: (key)=>{
    // placeholder actions for tools
    switch(key){
      case 'comics':
        alert('Open Comics Builder — (placeholder)');
        break;
      case 'books':
        alert('Open Books Builder — (placeholder)');
        break;
      case 'newspapers':
        alert('Open Newspapers Builder — (placeholder)');
        break;
      case 'editor':
        alert('Open Text Editor — (placeholder)');
        break;
      default:
        console.log('Tool:', key);
    }
  }
});

// expose for debugging in devtools
window.__APP__ = app;
