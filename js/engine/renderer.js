export class VNRenderer {
    constructor(container) {
        this.container = container;
        this.container.innerHTML = `
            <div class="vn-layer-bg" style="position:absolute; inset:0; background-size:cover; background-position:center; transition: background 0.5s;"></div>
            <div class="vn-layer-char" style="position:absolute; inset:0; display:flex; justify-content:center; align-items:end;"></div>
            <div class="vn-form" style="position:absolute; bottom:0; left:0; right:0; padding:20px; background:rgba(0,0,0,0.8); color:white; min-height:150px; display:flex; flex-direction:column; gap:8px;">
                 <div class="vn-speaker" style="font-weight:bold; color:var(--color-primary);"></div>
                 <div class="vn-text" style="font-size:1.1em; line-height:1.5;"></div>
                 <div class="vn-choices" style="margin-top:10px; display:flex; gap:10px; flex-wrap:wrap;"></div>
            </div>
        `;

        this.els = {
            bg: this.container.querySelector('.vn-layer-bg'),
            char: this.container.querySelector('.vn-layer-char'),
            speaker: this.container.querySelector('.vn-speaker'),
            text: this.container.querySelector('.vn-text'),
            choices: this.container.querySelector('.vn-choices'),
            form: this.container.querySelector('.vn-form')
        };
    }

    renderScene(scene, stepIndex = 0) {
        if (!scene) return;

        // Background
        this.els.bg.style.backgroundImage = scene.background ? `url(${scene.background})` : 'none';
        this.els.bg.style.backgroundColor = scene.background ? 'transparent' : '#333';

        // Dialogue
        const dialogue = scene.dialogues[stepIndex];
        if (dialogue) {
            this.els.speaker.textContent = dialogue.speaker || '';
            this.els.text.textContent = dialogue.text || '';

            // Character Image logic (simple)
            this.els.char.innerHTML = dialogue.characterImg ? `<img src="${dialogue.characterImg}" style="max-height:80vh; filter:drop-shadow(0 0 10px rgba(0,0,0,0.5));" />` : '';
        } else {
            // End of scene or empty
            this.els.text.textContent = "(End of Scene)";
        }
    }
}
