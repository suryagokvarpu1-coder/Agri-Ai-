const fs = require('fs');

const fileContent = fs.readFileSync('translations.js', 'utf8');

const newMethod = `    _translateHardcodedText() {
        const lang = this.currentLanguage;
        const map = this._getHardcodedTextMap(lang);
        if (!map) return;

        // Walk all text nodes and translate matching strings
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode(node) {
                    // Skip script, style, and already-translated nodes
                    const parent = node.parentElement;
                    if (!parent) return NodeFilter.FILTER_REJECT;
                    const tag = parent.tagName;
                    if (['SCRIPT','STYLE','NOSCRIPT'].includes(tag)) return NodeFilter.FILTER_REJECT;
                    if (parent.hasAttribute('data-i18n')) return NodeFilter.FILTER_REJECT;
                    if (parent.hasAttribute('data-translated')) return NodeFilter.FILTER_REJECT;
                    const text = node.textContent.trim();
                    // Skip short strings and purely numeric values
                    if (!text || text.length < 2 || !isNaN(text)) return NodeFilter.FILTER_REJECT;
                    return NodeFilter.FILTER_ACCEPT;
                }
            }
        );

        const nodesToTranslate = [];
        let node;
        while ((node = walker.nextNode())) {
            nodesToTranslate.push(node);
        }

        const missingTexts = new Set();

        nodesToTranslate.forEach(textNode => {
            const original = textNode.textContent.trim();
            if (map[original]) {
                textNode.textContent = textNode.textContent.replace(original, map[original]);
                if (textNode.parentElement) {
                    textNode.parentElement.setAttribute('data-translated', 'true');
                }
            } else {
                missingTexts.add(original);
            }
        });

        // Automatically detect and translate missing texts dynamically
        if (missingTexts.size > 0) {
            this._fetchMissingTranslations(Array.from(missingTexts), lang, map).then(() => {
                // Re-apply translations for the newly fetched strings
                nodesToTranslate.forEach(textNode => {
                    const original = textNode.textContent.trim();
                    if (map[original]) {
                        textNode.textContent = textNode.textContent.replace(original, map[original]);
                        if (textNode.parentElement) {
                            textNode.parentElement.setAttribute('data-translated', 'true');
                        }
                    }
                });
            });
        }

        // Also translate select option text
        document.querySelectorAll('select option').forEach(opt => {
            const text = opt.textContent.trim();
            if (map[text]) opt.textContent = map[text];
            else if (text.length > 1 && isNaN(text)) {
                this._fetchSingleDynamic(text, lang, map).then(t => { if (t) opt.textContent = t; });
            }
        });

        // Translate placeholder attributes not covered by data-i18n
        document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(el => {
            if (el.hasAttribute('data-i18n')) return;
            const ph = el.getAttribute('placeholder');
            if (ph && map[ph]) el.setAttribute('placeholder', map[ph]);
            else if (ph && ph.length > 1 && isNaN(ph)) {
                this._fetchSingleDynamic(ph, lang, map).then(t => { if (t) el.setAttribute('placeholder', t); });
            }
        });
    }

    async _fetchMissingTranslations(texts, lang, map) {
        const promises = texts.map(text => this._fetchSingleDynamic(text, lang, map));
        await Promise.allSettled(promises);
    }

    async _fetchSingleDynamic(text, lang, map) {
        // Skip overly long or purely numeric strings to save bandwidth
        if (text.length > 100 || !/[a-zA-Z]/.test(text)) return null;

        const cacheKey = \`agri_trans_\${lang}_\${text}\`;
        try {
            if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem(cacheKey)) {
                const cached = sessionStorage.getItem(cacheKey);
                map[text] = cached;
                return cached;
            }

            const url = \`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=\${lang}&dt=t&q=\${encodeURIComponent(text)}\`;
            const res = await fetch(url);
            const data = await res.json();
            const translated = data[0].map(item => item[0]).join('');
            map[text] = translated;
            if (typeof sessionStorage !== 'undefined') {
                sessionStorage.setItem(cacheKey, translated);
            }
            return translated;
        } catch(e) {
            return null;
        }
    }`;

// Since JS regexes with `.` don't match newlines, we use `[\s\S]*?`
// But we'll just slice the string directly to be safe!
const startStr = "    _translateHardcodedText() {";
const endStr = "    _getHardcodedTextMap(lang) {";

const startIndex = fileContent.indexOf(startStr);
const endIndex = fileContent.indexOf(endStr);

if (startIndex === -1 || endIndex === -1) {
    console.log("Could not find start or end strings!", startIndex, endIndex);
} else {
    const newContent = fileContent.substring(0, startIndex) + newMethod + "\n\n" + fileContent.substring(endIndex);
    fs.writeFileSync('translations.js', newContent);
    console.log("Replaced successfully for real!");
}
