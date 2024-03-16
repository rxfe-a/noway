  const tabModule = {
    TabCounter: 0,
    TabDividend: document.getElementById("TabHold"),
    FocusTabID: null,
  
    NewTab: function() {
      this.TabCounter++;
      const NewTabID = this.TabCounter;
      const TabElement = document.createElement("div");
      TabElement.className = "TabPiece";
      TabElement.id = `${NewTabID}_tabElement`;
      this.FocusTabID = NewTabID;
      const TabName = `Tab ${NewTabID}`;
      TabElement.innerHTML = `
        <div class="Tabadab">
          <p style="margin-left: 5px;">${TabName}</p>
          <button class="TabManagementXButton" onclick="tabModule.KillTab(${NewTabID})">X</button>
        </div>
        <div class="TabIMG" id="TabLogo">
          <img src="image/TabADF.png">
        </div>
      `;
      this.TabDividend.appendChild(TabElement);
  
      this.ClearIframeSelection();
      const MainIframe = document.createElement('iframe');
      document.body.appendChild(MainIframe)
      MainIframe.className = 'BrowserFrame';
      MainIframe.id = `${NewTabID}_iframe`;
      MainIframe.src = 'homepage.html';
      MainIframe.style.display = 'flex';
      TabElement.onclick = () => {
        this.ClearIframeSelection();
        this.FocusTabID = NewTabID;
        document.getElementById(`${this.FocusTabID}_iframe`).style.display = 'flex';
      };
    },
  
    KillTab: function(ID) {
      document.getElementById(`${ID}_tabElement`).remove();
      document.getElementById(`${ID}_iframe`).remove();
    },
  
    ClearIframeSelection: function() {
      const iframes = document.getElementsByClassName("BrowserFrame");
      for (let i = 0; i < iframes.length; i++) {
        iframes[i].style.display = "none";
      }
    },

    ReturnTab: function() {
      return this.FocusTabID;
    },
    
    ReturnTabCounter: function() {
      return this.TabCounter;
    }
  };
  