const NewAdFormPage = () => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      // Read the form data
      const form = e.target;
      const formData = new FormData(form as HTMLFormElement);

      // Or you can work with it as a plain object:
      const formJson = Object.fromEntries(formData.entries());
      console.log(formJson);
    }}
  >
    <label>
      Titre de l'annonce:
      <br />
      <input className="text-field" type="text" name="titre" />
    </label>
    <br />
    <label>
      Description:
      <br />
      <input className="text-field" type="text" name="description" />
    </label>
    <button className="button">Submit</button>
  </form>
);

export default NewAdFormPage;
