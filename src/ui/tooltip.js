export default {
  directives: {
    tooltip: {
      bind: function(el, binding) {
        
        el.addEventListener("mouseover", function(evt) {

          let targetDomEl = evt.srcElement;
          let domRect = targetDomEl.getBoundingClientRect();

          const tooltip = document.createElement("div");
          tooltip.innerHTML = targetDomEl.innerText;
          tooltip.classList.add("v-tooltip");

          if(binding.value==="bottom"){
            tooltip.classList.add("bottom");
            tooltip.style = "left:" + domRect.left + "px; top:" + (domRect.top + domRect.height + 5) + "px;";
          }
          if(binding.value==="top"){
            tooltip.classList.add("top");
            tooltip.style = "left:" + domRect.left + "px; top:" + (domRect.top - domRect.height-20) + "px;";
          }
          document.body.appendChild(tooltip);
          
          targetDomEl.addEventListener("mouseout", function() {
            const tooltip = document.querySelector(".v-tooltip");
            if (tooltip) {
              if (tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
              }
            }
          });
        });
      },
    },
  },
};
