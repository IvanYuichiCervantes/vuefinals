<template>
    <div class="increment-decrement">
      <p class="number-display">
        Child's Value: <strong>{{ childValue }}</strong>
      </p>
      <div class="button-group">
        <button @click="decrement">➖ Decrement</button>
        <button @click="increment">➕ Increment</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'IncrementDecrement',
    props: {
      childValue: {
        type: Number,
        required: true,
      },
    },
    methods: {
      increment() {
        const newValue = this.childValue + 1;
        this.$emit('update-values', newValue);
      },
      decrement() {
        const newValue = this.childValue - 1;
        this.$emit('update-values', newValue);
      },
    },
  };
  </script>
  
  <style scoped>
  .increment-decrement {
    text-align: center;
  }
  
  .number-display {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
  
  .button-group {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  
  button {
    padding: 10px 20px;
    font-size: 1rem;
    font-weight: bold;
    color: #fff;
    background-color: #2a5298;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #1e3c72;
  }
  
  button:active {
    transform: scale(0.95);
  }
  </style>