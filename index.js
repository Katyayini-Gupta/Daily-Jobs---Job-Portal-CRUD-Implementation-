const state = {
  jobList: [],
};

const jobContents = document.querySelector(".job__contents");
const jobModal = document.querySelector(".job__modal__body");

const htmlJobContent = ({id, cname, pos, Jdesc, skills, CTC, imgURL, loc, start, apply, type}) => `<div class="col-md-12 col-lg-6 mt-3" id=${id} key=${id}>
<div class="card">
    <div class="card-header bg-warning">
        <div class="d-flex justify-content-end">
          <button class="btn btn-outline-success" style="margin-right: 10px;" name=${id} onclick="editTask.apply(this, arguments)"><i class="fas fa-edit" name=${id}></i> Edit</button>
          <button class="btn btn-outline-danger" name=${id} onclick="deleteTask.apply(this, arguments)"><i class="fas fa-trash-alt" name=${id}></i> Delete</button>
        </div>
    </div>
    <div class="card-body" style="background-color: #f5f5f5;">
      <div class="d-flex p-0 justify-content-between">
        <div>
          <h5 class="card-title">${pos}</h5>
          <h6 class="card-subtitle mb-4 text-muted">${cname}</h6>
        </div>
        <div>
          <img src=${imgURL} alt="company-logo">
        </div>
      </div>
      <i class="fas fa-map-marker-alt" style="margin-bottom: 20px"></i>
      <span class="card-text" style="margin-bottom: 20px;"> ${loc}</span>
      <div class="job-detail d-flex p-0 justify-content-start">
        <div class="p-0" style="margin-right: 20px;">
          <p class="card-text text-muted" style="font-size: small; margin-bottom: 5px;"><i class="fas fa-play-circle"></i> START DATE</p>
          <p class="card-text">${start}</p>
        </div>
        <div class="p-0" style="margin-right: 20px;">
          <p class="card-text text-muted" style="font-size: small; margin-bottom: 5px;"><i class="fas fa-money-bill"></i> CTC</p>
          <p class="card-text"><i class="fas fa-rupee-sign"></i> ${CTC}</p>
        </div>
        <div class="p-0">
          <p class="card-text text-muted" style="font-size: small; margin-bottom: 5px;"><i class="fas fa-hourglass-end"></i> APPLY BY</p>
          <p class="card-text">${apply}</p>
        </div>
      </div>
      <span class="badge mt-4 rounded-pill bg-secondary">${type}</span>
    </div>
    <div class="card-footer bg-warning">
        <button type="button" class="btn btn-outline-primary float-end"  data-bs-toggle="modal" data-bs-target="#showTask" onclick="openTask.apply(this,arguments)" id=${id}>View Job Details</button>
    </div>
</div>
</div>`;

const htmlModalContent = ({ id, cname, pos, Cdesc, Jdesc, skills, CTC, imgURL, loc, start, apply, type, opening}) => {
  const date = new Date(parseInt(id));
  return ` <div class="modal-header bg-warning">
  <strong class="text-sm text-muted">Created on ${date.toDateString()}</strong>
  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body">
  <div id=${id}>
    <div class="d-flex p-0 justify-content-between">
      <div>
        <h5 class="card-title">${pos}</h5>
        <h6 class="card-subtitle mb-4 text-muted">${cname}</h6>
      </div>
      <div>
        <img src=${imgURL} alt="company-logo">
      </div>
    </div>
    <p class="card-text" style="margin-bottom: 10px;"><i class="fas fa-map-marker-alt text-muted"></i> ${loc}</p>
    <div class="d-flex p-0 justify-content-start">
      <div class="p-1" style="margin-right: 20px;">
        <p class="card-text text-muted" style="font-size: small; margin-bottom: 5px;"><i class="fas fa-play-circle"></i> START DATE</p>
        <p class="card-text">${start}</p>
      </div>
      <div class="p-1" style="margin-right: 20px;">
        <p class="card-text text-muted" style="font-size: small; margin-bottom: 5px;"><i class="fas fa-money-bill"></i> CTC</p>
        <p class="card-text"><i class="fas fa-rupee-sign"></i> ${CTC}</p>
      </div>
      <div class="p-1">
        <p class="card-text text-muted" style="font-size: small; margin-bottom: 5px;"><i class="fas fa-hourglass-end"></i> APPLY BY</p>
        <p class="card-text">${apply}</p>
      </div>
    </div>
    <span class="badge mt-4 mb-3 rounded-pill bg-secondary">${type}</span>
    <p class="card-text"><i class="fas fa-bolt" style="color: orange;"></i> Be an early applicant</p>
    <hr class="style2">
    </br>
    <h6 class="card-subtitle">About ${cname}</h6>
    <p class="card-text"><small>${Cdesc}</small></p>
    <h6 class="card-subtitle">About the job</h6>
    <p class="card-text"><small>${Jdesc}</small></p>
    <h6 class="card-subtitle">Skill(s) Required</h6>
    <span class="badge mt-2 mb-3 rounded-pill bg-secondary">${skills}</span>
    <h6 class="card-subtitle">Number of openings</h6>
    <p class="card-text"><small>${opening}</small></p>
  </div>
</div>
<div class="modal-footer">
  <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Apply Now</button>
</div>`;
};

const updateLocalStorage = () => {
  localStorage.setItem("Jobs", JSON.stringify({ job: state.jobList }));
};

const loadInitialData = () => {
  const localStorageCopy = JSON.parse(localStorage.Jobs);
  if (localStorageCopy) state.jobList = localStorageCopy.job;
  state.jobList.map((cardData) => {
    jobContents.insertAdjacentHTML("beforeend", htmlJobContent(cardData));
  });
};

const handlesubmit = (e) => {
  const id = `${Date.now()}`;
  const input = {
    cname: document.getElementById("cname").value,
    imgURL: document.getElementById("imgURL").value,
    pos: document.getElementById("pos").value,
    loc: document.getElementById("loc").value,
    Cdesc: document.getElementById("Cdesc").value,
    Jdesc: document.getElementById("Jdesc").value,
    skills: document.getElementById("skills").value,
    start: document.getElementById("start").value,
    apply: document.getElementById("apply").value,
    CTC: document.getElementById("CTC").value,
    type: document.getElementById("type").value,
    opening: document.getElementById("opening").value,
  };

  jobContents.insertAdjacentHTML("beforeend",htmlJobContent({ ...input, id }));
  state.jobList.push({ ...input, id });
  updateLocalStorage();
};

const openTask = (e) => {
  if (!e) e = window.event;

  const getJob = state.jobList.filter(({ id }) => id === e.target.id);
  jobModal.innerHTML = htmlModalContent(getJob[0]);
};

const deleteTask = (e) => {
  if (!e) e = window.event;
  const targetID = e.target.getAttribute("name");
  const type = e.target.tagName;
  const removeJob = state.jobList.filter(({ id }) => id !== targetID);
  state.jobList = removeJob;

  updateLocalStorage();
  if (type === "BUTTON")
    return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
      e.target.parentNode.parentNode.parentNode
    );
  return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
    e.target.parentNode.parentNode.parentNode.parentNode
  );
  window.location.reload();
};

const editTask = (e) => {
  if (!e) e = window.event;
  const targetID = e.target.id;
  const type = e.target.tagName;
  let parentNode;
  let companyName;
  let position;
  let location;
  let startDate;
  let ctc;
  let applyBy;
  let jobType;
  let submitButton;
  if (type === "BUTTON") {
    parentNode = e.target.parentNode.parentNode.parentNode;
  }

  // console.log(parentNode.childNodes[3].childNodes[1].childNodes[1].childNodes[3]);
  // console.log(parentNode.childNodes[3].childNodes[1].childNodes[1].childNodes[1]);
  // console.log(parentNode.childNodes[3].childNodes[3]);
  // console.log(parentNode.childNodes[3].childNodes[5].childNodes[1].childNodes[3]);
  // console.log(parentNode.childNodes[3].childNodes[5].childNodes[3].childNodes[3]);
  // console.log(parentNode.childNodes[3].childNodes[5].childNodes[5].childNodes[3]);
  // console.log(parentNode.childNodes[3].childNodes[7]);
  // console.log(parentNode.childNodes[5].childNodes[1]);



  companyName = parentNode.childNodes[3].childNodes[1].childNodes[1].childNodes[3];
  position = parentNode.childNodes[3].childNodes[1].childNodes[1].childNodes[1];
  location = parentNode.childNodes[3].childNodes[5];
  startDate = parentNode.childNodes[3].childNodes[7].childNodes[1].childNodes[3];
  ctc = parentNode.childNodes[3].childNodes[7].childNodes[3].childNodes[3];
  applyBy = parentNode.childNodes[3].childNodes[7].childNodes[5].childNodes[3];
  jobType = parentNode.childNodes[3].childNodes[9];
  submitButton =parentNode.childNodes[5].childNodes[1];

  companyName.setAttribute("contenteditable", "true");
  position.setAttribute("contenteditable", "true");
  location.setAttribute("contenteditable", "true");
  startDate.setAttribute("contenteditable", "true");
  ctc.setAttribute("contenteditable", "true");
  applyBy.setAttribute("contenteditable", "true");
  jobType.setAttribute("contenteditable", "true");

  submitButton.setAttribute("onclick", "saveEdit.apply(this, arguments)");
  submitButton.setAttribute("onclick", "saveEdit.apply(this, arguments)");
  submitButton.removeAttribute("data-bs-toggle");
  submitButton.removeAttribute("data-bs-target");
  submitButton.innerHTML = "Save Changes";
};

const saveEdit = (e) => {
  if (!e) e = window.event;
  const targetID = e.target.id;
  const parentNode = e.target.parentNode.parentNode;

  console.log(parentNode.childNodes[3].childNodes[1].childNodes[1].childNodes[3]);
  console.log(parentNode.childNodes[3].childNodes[1].childNodes[1].childNodes[1]);
  console.log(parentNode.childNodes[3].childNodes[5]);
  console.log(parentNode.childNodes[3].childNodes[7].childNodes[1].childNodes[3]);
  console.log(parentNode.childNodes[3].childNodes[7].childNodes[3].childNodes[3]);
  console.log(parentNode.childNodes[3].childNodes[7].childNodes[5].childNodes[3]);
  console.log(parentNode.childNodes[3].childNodes[9]);
  console.log(parentNode.childNodes[5].childNodes[1]);

  const companyName = parentNode.childNodes[3].childNodes[1].childNodes[1].childNodes[3];
  const position = parentNode.childNodes[3].childNodes[1].childNodes[1].childNodes[1];
  const location = parentNode.childNodes[3].childNodes[5];
  const startDate = parentNode.childNodes[3].childNodes[7].childNodes[1].childNodes[3];
  const ctc = parentNode.childNodes[3].childNodes[7].childNodes[3].childNodes[3];
  const applyBy = parentNode.childNodes[3].childNodes[7].childNodes[5].childNodes[3];
  const jobType = parentNode.childNodes[3].childNodes[9];
  const submitButton =parentNode.childNodes[5].childNodes[1];

  const updateData = {
    companyName: companyName.innerHTML,
    position: position.innerHTML,
    location: location.innerHTML,
    startDate: startDate.innerHTML,
    ctc: ctc.innerHTML,
    applyBy: applyBy.innerHTML,
    jobType: jobType.innerHTML,
  };

  let stateCopy = state.jobList;
  stateCopy = stateCopy.map((job) =>
    job.id === targetID
      ? {
          id: job.id,
          cname: updateData.companyName,
          pos: updateData.position,
          loc: updateData.location,
          start: updateData.startDate,
          apply: updateData.applyBy,
          type: updateData.jobType,
          imgURL: job.imgURL,
        }
      : task
  );

  state.jobList = stateCopy;
  updateLocalStorage();
  companyName.setAttribute("contenteditable", "false");
  position.setAttribute("contenteditable", "false");
  location.setAttribute("contenteditable", "false");
  startDate.setAttribute("contenteditable", "false");
  ctc.setAttribute("contenteditable", "false");
  applyBy.setAttribute("contenteditable", "false");
  jobType.setAttribute("contenteditable", "false");

  submitButton.setAttribute("onclick", "openTask.apply(this, arguments)");
  submitButton.setAttribute("data-bs-toggle", "modal");
  submitButton.setAttribute("data-bs-target", "#showTask");
  submitButton.innerHTML = "View Job Details";
};