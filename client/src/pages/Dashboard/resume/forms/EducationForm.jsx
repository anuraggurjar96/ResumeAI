export default function EducationForm({
  education,
  handleEducationChange,
  addEducation,
  removeEducation,
}) {
  return (
    <div className="space-y-8">

      {/* Heading */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">
          Education
        </h2>

        <p className="mt-2 text-gray-500">
          Add your academic qualifications from the most recent one.
        </p>
      </div>

      {education?.map((edu, index) => {

        const isSchool =
          edu.qualification === "Secondary School" ||
          edu.qualification === "Senior Secondary School";

        return (

          <div
            key={index}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm p-7 space-y-6"
          >

            {/* Card Header */}

            <div className="flex items-center justify-between">

              <h3 className="text-lg font-semibold text-gray-800">
                Education {index + 1}
              </h3>

              {education.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm hover:bg-gray-100 transition"
                >
                  Remove
                </button>
              )}

            </div>

            {/* Qualification */}

            <div>

              <label className="block mb-2 text-sm font-medium text-gray-700">
                Qualification *
              </label>

              <select
                name="qualification"
                value={edu.qualification}
                onChange={(e) =>
                  handleEducationChange(index, e)
                }
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              >
                <option value="">Select Qualification</option>

                <option>Secondary School</option>

                <option>Senior Secondary School</option>

                <option>Diploma</option>

                <option>B.Tech</option>

                <option>BCA</option>

                <option>B.Sc</option>

                <option>B.Com</option>

                <option>BA</option>

                <option>M.Tech</option>

                <option>MCA</option>

                <option>MBA</option>

                <option>M.Sc</option>

                <option>PhD</option>

                <option>Other</option>

              </select>

            </div>
                        {/* Dynamic Fields */}

            {isSchool ? (

              <div className="grid md:grid-cols-2 gap-5">

                {/* School Name */}

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    School Name *
                  </label>

                  <input
                    type="text"
                    name="institution"
                    value={edu.institution}
                    onChange={(e) => handleEducationChange(index, e)}
                    placeholder="e.g. ABC Senior Secondary School"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-black outline-none"
                  />
                </div>

                {/* Board */}

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Board *
                  </label>

                  <input
                    type="text"
                    name="board"
                    value={edu.board}
                    onChange={(e) => handleEducationChange(index, e)}
                    placeholder="RBSE / CBSE / ICSE"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-black outline-none"
                  />
                </div>

                {/* City */}

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={edu.city}
                    onChange={(e) => handleEducationChange(index, e)}
                    placeholder="Jaipur"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-black outline-none"
                  />
                </div>

                {/* Percentage */}

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Percentage / CGPA
                  </label>

                  <input
                    type="text"
                    name="score"
                    value={edu.score}
                    onChange={(e) => handleEducationChange(index, e)}
                    placeholder="91% / 8.0 CGPA"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-black outline-none"
                  />
                </div>

                {/* Passing Year */}

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Passing Year
                  </label>

                  <input
                    type="number"
                    name="endYear"
                    value={edu.endYear}
                    onChange={(e) => handleEducationChange(index, e)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-black outline-none"
                  />
                </div>

              </div>

            ) : (

              <div className="grid md:grid-cols-2 gap-5">

                {/* Branch */}

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Branch / Specialization
                  </label>

                  <input
                    type="text"
                    name="branch"
                    value={edu.branch}
                    onChange={(e) => handleEducationChange(index, e)}
                    placeholder="Computer Science"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-black outline-none"
                  />
                </div>

                {/* College */}

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    College Name *
                  </label>

                  <input
                    type="text"
                    name="institution"
                    value={edu.institution}
                    onChange={(e) => handleEducationChange(index, e)}
                    placeholder="XYZ"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-black outline-none"
                  />
                </div>

                {/* University */}

                {/* <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    University
                  </label>

                  <input
                    type="text"
                    name="board"
                    value={edu.board}
                    onChange={(e) => handleEducationChange(index, e)}
                    placeholder="ABC"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-black outline-none"
                  />
                </div> */}

                {/* City */}

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={edu.city}
                    onChange={(e) => handleEducationChange(index, e)}
                    placeholder="Jaipur"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-black outline-none"
                  />
                </div>

                {/* CGPA */}

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    CGPA / Percentage
                  </label>

                  <input
                    type="text"
                    name="score"
                    value={edu.score}
                    onChange={(e) => handleEducationChange(index, e)}
                    placeholder="8.45 CGPA"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-black outline-none"
                  />
                </div>
                                {/* Start Year */}

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Start Year
                  </label>

                  <input
                    type="number"
                    name="startYear"
                    value={edu.startYear}
                    onChange={(e) => handleEducationChange(index, e)}
                    placeholder="2024"
                    disabled={edu.currentlyStudying}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-black outline-none disabled:bg-gray-100"
                  />
                </div>

                {/* End Year */}

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    End Year
                  </label>

                  <input
                    type="number"
                    name="endYear"
                    value={edu.endYear}
                    onChange={(e) => handleEducationChange(index, e)}
                    placeholder="2028"
                    disabled={edu.currentlyStudying}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-black outline-none disabled:bg-gray-100"
                  />
                </div>

                {/* Currently Studying */}

                <div className="md:col-span-2">
                  <label className="inline-flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="currentlyStudying"
                      checked={edu.currentlyStudying || false}
                      onChange={(e) => handleEducationChange(index, e)}
                      className="h-5 w-5 rounded border-gray-300 accent-black"
                    />

                    <span className="text-gray-700 font-medium">
                      I am currently studying here
                    </span>
                  </label>
                </div>

              </div>

            )}

          </div>

        );

      })}

      {/* Bottom Buttons */}

      <div className="flex justify-center pt-2">

        <button
          type="button"
          onClick={addEducation}
          className="inline-flex items-center gap-2 rounded-xl border border-gray-900 px-6 py-3 text-sm font-semibold text-gray-900 transition-all duration-200 hover:bg-gray-900 hover:text-white"
        >
          + Add Education
        </button>

      </div>

    </div>
  );
}