import {Link} from "react-router-dom";

export const Wrapper = props => {
    return (
      <>
        <div class="header">
            <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                <a class="navbar-brand col-md-3 col-lg-2 me-0 px-5 fs-6" href="/">Bank SinoPac Merchant name converter</a>
            </header>
        </div>
  
  
        <div class="container-fluid">
          <div class="row">
            <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                <div class="position-sticky pt-3">
                    <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
                        <span>CRUD operation</span>
                        <a class="link-secondary" href="#" aria-label="Add a new report">
                        <span data-feather="plus-circle" class="align-text-bottom"></span>
                        </a>
                    </h6>
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <a className="btn btn-lg btn-outline-primary" aria-current="page" href="/create">Create</a>
                        </li>
                        <li class="nav-item">
                            <a className="btn btn-lg btn-outline-primary" aria-current="page" href="/read"> Read </a>
                        </li>
                        <li class="nav-item">
                            <a className="btn btn-lg btn-outline-primary" aria-current="page" href="/update">Update</a>
                        </li>
                        <li class="nav-item">
                            <a className="btn btn-lg btn-outline-primary" aria-current="page" href="/delete">Delete</a>
                        </li>
                    </ul>

                    <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
                    <span>Import and Cleanup</span>
                    <a class="link-secondary" href="#" aria-label="Add a new report">
                        <span data-feather="plus-circle" class="align-text-bottom"></span>
                    </a>
                    </h6>
                    <ul class="nav flex-column mb-2">
                        <li class="nav-item">
                            <a class="nav-link" href="#">
                            <span data-feather="file-text" class="align-text-bottom"></span>
                            Import
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">
                            <span data-feather="file-text" class="align-text-bottom"></span>
                            Cleanup
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
  
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                {props.children}
            </main>
          </div>
        </div>
      </>
    )
}