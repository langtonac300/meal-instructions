The recipe page's sticky ⚡ GET TO THE POINT / 📖 STEP-BY-STEP toggle (never a modal — HR-7); ModeSwitchCards is the larger card-style picker variant.

```jsx
<ModeSwitch mode={mode} onChange={setMode} />
<ModeSwitchCards mode="quick" onChange={setMode} />
```

Both panels stay in the DOM; only visibility switches (HR-6).
