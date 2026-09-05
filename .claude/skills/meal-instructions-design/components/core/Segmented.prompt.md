Ink-on-paper toggle group (servings, grid/table view, the ⚡ GET TO THE POINT / 📖 STEP-BY-STEP mode selector).

```jsx
<Segmented options={[{value:2,label:'2'},{value:4,label:'4'},{value:6,label:'6'},{value:8,label:'8'}]} value={4} onChange={setServings} />
<Segmented icon options={[{value:'grid',icon:<Icon name="layout-grid" />},{value:'table',icon:<Icon name="list-filter" />}]} value={view} onChange={setView} />
<Segmented variant="square" value={mode} onChange={setMode} options={[
  {value:'fast', icon:<Icon name="zap" size={14} style={{color:'var(--accent)'}} />, label:'⚡ GET TO THE POINT', note:'(20 Words)'},
  {value:'detailed', icon:<Icon name="book-open" size={14} />, label:'📖 STEP-BY-STEP', note:'(Guided Steps)'}]} />
```
