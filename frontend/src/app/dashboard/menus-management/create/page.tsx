export default function CreateNewMenuPage(){
    return(
        <>
            <h2 className="text-2xl font-bold mb-4">Create New Menu</h2>
            <form>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Menu Name</legend>
                    <input type="text" className="input w-full" placeholder="Type here" />
                    <p className="label">Optional</p>
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Price</legend>
                    <input type="text" className="input w-full" placeholder="Type here" />
                    <p className="label">Optional</p>
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Description</legend>
                    <textarea className="textarea h-24 w-full" placeholder="Bio"></textarea>
                    <div className="label">Optional</div>
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Menu Image(s)</legend>
                    <input type="file" className="file-input w-full" />
                    <label className="label">Max size 2MB</label>
                </fieldset>

                <div className="form-control mb-3">
                <label className="label cursor-pointer justify-start gap-3">
                    <input type="checkbox" className="toggle toggle-primary" />
                    <span className="label-text">Is Available</span>
                </label>
                </div>

                <div className="form-control">
                <button type="submit" className="btn btn-primary w-full">
                    Save Menu
                </button>
                </div>
            </form>
        </>
    )
}