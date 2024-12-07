async function get_repo_list_by_username(username, ignoreList = []) {
    const url = `https://api.github.com/users/${username}/repos`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const repositories = await response.json();

        const filteredRepositories = repositories.filter(repo => 
            !ignoreList.includes(repo.name)
        );
        paint_repo(filteredRepositories);
    } catch (error) {
        console.error('Error fetching repositories:', error);
    }
}

function paint_repo(repositories) {
    const container = document.querySelector('.card-container');
    container.innerHTML = '';

    repositories.forEach(repo => {
        const card = document.createElement('div');
        card.classList.add('card');
        
        card.innerHTML = `
            <div class="card-body">
                <h4 class="repo-name">
                    <a href="${repo.html_url}" target="_blank">${repo.full_name}</a>
                </h4>
                <div class="repo-description">
                    ${repo.description ? repo.description : ''}
                </div>
                <a href="${repo.html_url}/stargazers" class="repo-stars" target="_blank">
                    <div class="icon-correct">
                        <div class="star-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" style="fill: currentcolor;" width="15px" height="15px" viewBox="0 0 24 24">
                                <path d="M22,9.67A1,1,0,0,0,21.14,9l-5.69-.83L12.9,3a1,1,0,0,0-1.8,0L8.55,8.16,2.86,9a1,1,0,0,0-.81.68,1,1,0,0,0,.25,1l4.13,4-1,5.68a1,1,0,0,0,.4,1,1,1,0,0,0,1.05.07L12,18.76l5.1,2.68a.93.93,0,0,0,.46.12,1,1,0,0,0,.59-.19,1,1,0,0,0,.4-1l-1-5.68,4.13-4A1,1,0,0,0,22,9.67Zm-6.15,4a1,1,0,0,0-.29.89l.72,4.19-3.76-2a1,1,0,0,0-.94,0l-3.76,2,.72-4.19a1,1,0,0,0-.29-.89l-3-3,4.21-.61a1,1,0,0,0,.76-.55L12,5.7l1.88,3.82a1,1,0,0,0,.76.55l4.21.61Z"/>
                            </svg>
                        </div>
                        <div class="star-count m-3">${repo.stargazers_count}</div>
                    </div>
                </a>
            </div>
        `;
        
        container.appendChild(card);
    });
}

get_repo_list_by_username('xastrix', ['xastrix.github.io']);