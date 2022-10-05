import React from 'react';
import ReactDOM from 'react-dom';

function Example() {
    return (
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header"><h1>Example</h1></div>

                        <div class="card-body">I'm an example component!</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Title() { return 'Judul' };

ReactDOM.render(<Example />, document.getElementById('content'));
ReactDOM.render(<Title />, document.getElementById('title'));