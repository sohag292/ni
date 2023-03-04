const loadToolsData = async (dataLimit, dateAscending) => {
  //loader
  toggleSpinner(true);
  const url = "https://openapi.programming-hero.com/api/ai/tools";
  const response = await fetch(url);
  const data = await response.json();
  let tools = data.data.tools;
  // Sorting tools 
  if (dateAscending) {
    tools = tools.sort((a, b) => new Date(a.published_in) - new Date(b.published_in));
  } else {
    tools = tools.sort((a, b) => new Date(b.published_in) - new Date(a.published_in));
  }
  displayTools(tools, dataLimit);
};

const displayTools = (tools, dataLimit) => {
const cardContainer = document.getElementById("card-container");
cardContainer.innerHTML = "";
let displayedTools;
if (dataLimit) {
  displayedTools = tools.slice(0, dataLimit);
} else {
  displayedTools = tools;
}

displayedTools.forEach((tool) => {
    const toolsDiv = document.createElement("div");
    toolsDiv.classList.add("col");
    let featuresHTML = '';
    if (tool.features.length > 0) {
      featuresHTML = `
        <h5 class="card-title my-4">Feature</h5>
        <div class="mb-4">
          ${tool.features.slice(0, 3).map((feature, index) => `<p>${index + 1}. ${feature}</p>`).join('')} 
          ${tool.features.length < 3 ? `<p>${tool.features.length + 1}. NO New feature</p>` : ''}
        </div>
        <hr>
      `;
    }
    toolsDiv.innerHTML = `
      <div class="card h-100 p-3">
        <img style="" src="${tool.image}" class="w-100 h-75" alt="image">
        <div>
          ${featuresHTML}
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h5>${tool.name}</h5>
            <span class="fs-6"><i class="bi bi-calendar3"></i> ${tool.published_in}</span>
          </div>
          <div><button onclick="loadDetails('${tool.id}')" style="border-radius: 23px"; class="btn btn-light" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="bi bi-arrow-right-short text-danger fs-3"></i></button></div>
        </div>
      </div>
    `;
    cardContainer.appendChild(toolsDiv);
});
  

const showAllButton = document.getElementById("detailsMore");
  if (dataLimit && dataLimit < tools.length) {
    showAllButton.classList.remove("d-none");
  } else {
    showAllButton.classList.add("d-none");
  }
  
  toggleSpinner(false);
};

//tooglerSpinner
const toggleSpinner = isLoading => document.getElementById('loader').classList.toggle('d-none', !isLoading);

const processSearch = (dataLimit) => {
  toggleSpinner(true);
  loadToolsData(dataLimit);
};


document.getElementById("btn-detailsMore").addEventListener("click", function () {
  processSearch();
});

const sortButton = document.querySelector(".sortButton").addEventListener("click", () => {
  loadToolsData(null, true);
});


const loadDetails = async id => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayDetails(data.data);
}

const displayDetails = Ai => {
  console.log(Ai);
  const AiContainer = document.getElementById("Ai-container");
  AiContainer.innerHTML = ''; 
  const AiDiv = document.createElement("div");
  AiDiv.classList.add("row");
  AiDiv.innerHTML = `
    <div class="col-lg-6">
      <div class="border border-danger rounded bg-light bg-gradient p-3">
        <h4 class="mb-4">${Ai.description}</h4>
        <div class="row">
          <div class="col-md-4 mb-3 mb-md-0 h-100">
            <p style="50px" class="text-success rounded p-4 text-center bg-white">
              ${Ai.pricing ? Ai.pricing[0].price : 'Free of Cost/ '}</br>
              ${Ai.pricing ? Ai.pricing[0].plan : 'Basic'}
            </p>
          </div>
          <div class="col-md-4 mb-3 mb-md-0 h-100">
          <p class="text-success text-warning rounded p-4 text-center bg-white">
          ${Ai.pricing ? Ai.pricing[1].price : 'Free of Cost'}</br>
          ${Ai.pricing ? Ai.pricing[1].plan : 'Pro'}
          </p>
          </div>
          <div class="col-md-4  mb-3 mb-md-0 h-100">
            <p class="text-danger rounded p-3 text-center bg-white">
            ${Ai.pricing ? Ai.pricing[2].price : 'Free of Cost'}</br>
            ${Ai.pricing ? Ai.pricing[2].plan : 'EnterPrise'}
          </p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <h4 class="mt-4">Features</h4>
            <ul>
              <li>${Ai.features ? Ai.features["1"].feature_name : ' Not Found'}</li>
              <li>${Ai.features ? Ai.features["2"].feature_name : ' Not Found'}</li>
              <li>${Ai.features ? Ai.features["3"].feature_name : ' Not Found'}</li>
            </ul>
          </div>
          <div class="col-md-6">
            <h4 class="mt-4">Integrations</h4>
            <ul>
               ${Ai.integrations?.slice(0, Ai.integrations.length).map((integration) => `<li>${integration}</li>`).join("") ?? "<p>No Data Found</p>"}
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-6 mt-4 mt-lg-0">
    <div class="position-relative">
        <img src="${Ai.image_link[0]}" class="img-fluid" alt="">
          <div style="top:20px;right:20px;" class="bg-danger rounded position-absolute py-2 px-4
              ${Ai.accuracy.score ? 'accuracy' : 'd-none'}">
          <h6 class="text-white">
              ${Ai.accuracy.score ? `<span>${Ai.accuracy.score*100}</span>% accuracy` : ''}
          </h6>
    </div>
</div>

      <div class="text-center mt-4">
        <h4>${Ai.input_output_examples ? Ai.input_output_examples[0].input : "Where are your information data?"}</h4>
        <p>${Ai.input_output_examples ? Ai.input_output_examples[0].output : "No! Not Yet Take a break!!!"}</p>
      </div>
  </div>

    </div>
  `;
  AiContainer.appendChild(AiDiv);
}

loadToolsData(6);



