import React from "react";
import { useForm } from "@mantine/form";
import { validateString } from "../../utils/common";
import { Button, Group, Select, TextInput } from "@mantine/core";
import useCountries from "../../hooks/useCountries";
import Map from "../Map/Map";

const AddLocation = ({ propertyDetails, setPropertyDetails, nextStep }) => {
  const { getAll } = useCountries();
  const form = useForm({
    initialValues: {
      country: propertyDetails?.country,
      city: propertyDetails?.city,
      address: propertyDetails?.address,
      localarea:propertyDetails?.localarea,
    },

    validate: {
      country: (value) => validateString(value),
      city: (value) => validateString(value),
      address: (value) => validateString(value),
      localarea:(value)=>validateString(value),
    },
  });


  const { country, city, address,localarea} = form.values;


  const handleSubmit = ()=> {
    const {hasErrors} = form.validate();
    if(!hasErrors) {
        setPropertyDetails((prev)=> ({...prev, localarea,city, address, country}))
        nextStep()
    }
  }
  return (
    <form
    onSubmit={(e)=>{
        e.preventDefault();
        handleSubmit()
    }}
    >
      <div
        className="flexCenter"
        style={{
          justifyContent: "space-between",
          gap: "3rem",
          marginTop: "3rem",
          flexDirection: "row",
        }}
      >
        {/* left side */}
        {/* inputs */}

        <div className="flexColStart" style={{ flex: 1, gap: "1rem" }}>
          <Select
            w={"100%"}
            withAsterisk
            label="Country"
            clearable
            searchable
            data={getAll()}
            {...form.getInputProps("country", { type: "input" })}
          />

          <TextInput
            w={"100%"}
            withAsterisk
            label="City"
            {...form.getInputProps("city", { type: "input" })}
          />


          <TextInput
            w={"100%"}
            withAsterisk
            label="Address"
            {...form.getInputProps("address", { type: "input" })}
          />
          <TextInput
            w={"100%"}
            withAsterisk
            label="localarea"
            {...form.getInputProps("localarea", { type: "input" })}
          />
        </div>

        {/* right side */}

        <div style={{ flex: 1 }}>
          <Map localarea={localarea} address={address} city={city} country={country}  />
        </div>
      </div>

      <Group position="center" mt={"xl"}>
        <Button type="submit">Next Step</Button>
      </Group>
    </form>
  );
};

export default AddLocation;
